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

@app.route("/")
def index():
    return "Being a 🐼 is the best"

@app.route("/recommend", methods=["POST"])
def recommend():
    try: 
        data = request.get_json()
        print("🚀 Received data: ", data)

        summary = data.get("summary")
        interests = data.get("interests", [])
        print("✅ Summary: ", summary)
        print("✅ Interests: ", interests)

        prompt = f"{summary.strip()}. Tags: {', '.join(interests)}"
        print("📝 Prompt sent to model:", prompt)
        
        # Tokenize input
        inputs = tokenizer(prompt, return_tensors="pt", truncation=True, max_length=512)
        inputs = {k: v.to(device) for k, v in inputs.items()}

        # Generate output
        outputs = model.generate(
            **inputs,
            max_new_tokens=600,
            max_length=1024,        
            num_beams=1,
            do_sample=False,
            repetition_penalty=1.1,
            early_stopping=True,
            pad_token_id=tokenizer.pad_token_id,
            eos_token_id=tokenizer.eos_token_id
        )

        print("📦 Raw output:", outputs)
        print("📦 Full decoded string:", tokenizer.decode(outputs[0], skip_special_tokens=True))

        result = tokenizer.decode(outputs[0], skip_special_tokens=True)

        print("🧪 Prompt length (tokens):", len(inputs['input_ids'][0]))
        print("🧪 Output tokens:", outputs[0])
        print("🧪 Decoded output:", result)
        print("✅ Model result: ", result )
        return jsonify({"recommendations": result})
    
    except Exception as e: 
        print("❌ Error in /recommend:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000)
