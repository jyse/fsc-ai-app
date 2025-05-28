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

@app.route("/recommend", methods=["POST"])
def recommend():
    print("🐲🐲🐲🐲🐲🐲🐲🐲🐲 IS THIS WORKING?")
    try: 
        data = request.get_json()
        print("🚀 Received data: ", data)

        summary = data.get("summary")
        interests = data.get("interests", [])
        print("✅ Summary: ", summary)
        print("✅ Interests: ", interests)

        prompt = f"{summary} Tags {', '.join(interests)}"
        
        # Tokenize input
        inputs = tokenizer(prompt, return_tensors="pt", truncation=True)
        inputs = {k: v.to(device) for k, v in inputs.items()}

        # Generate output
        outputs = model.generate(
            **inputs,
            max_new_tokens=200,
            num_beams=4,
            early_stopping=True
        )

        result = tokenizer.decode(outputs[0], skip_special_tokens=True)
        print("✅ Model result: ", result )
        return jsonify({"recommendations": result})
    
    except Exception as e: 
        print("❌ Error in /recommend:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000)
