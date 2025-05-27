from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

app = Flask(__name__)

# Load model and tokenizer
model_path = "./trained_model"
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForSeq2SeqLM.from_pretrained(model_path)

# Use GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)

@app.route("/infer", methods=["POST"])
def infer():
    data = request.get_json()
    prompt = data.get("prompt", "")
    
    # Tokenize input
    inputs = tokenizer(prompt, return_tensors="pt").to(device)

    # Generate output
    outputs = model.generate(
        **inputs,
        max_length=256,
        num_beams=4,
        early_stopping=True
    )

    result = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return jsonify({"result": result})

if __name__ == "__main__":
    app.run(port=5000)
