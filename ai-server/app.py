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

        prompt = f"{summary.strip()} Tags: {', '.join(interests)}"
        print("📝 Prompt sent to model:", prompt)
        
        # Tokenize input
        inputs = tokenizer(prompt, return_tensors="pt", truncation=True, max_length=512)
        inputs = {k: v.to(device) for k, v in inputs.items()}

        # Generate output
        outputs = model.generate(
            **inputs,
            max_new_tokens=500,  
            temperature=0.7,     
            do_sample=True,
            num_beams=3,         
            pad_token_id=tokenizer.pad_token_id,
            eos_token_id=tokenizer.eos_token_id
        )

        generated_tokens = outputs[0][inputs['input_ids'].shape[1]:]
        result = tokenizer.decode(generated_tokens, skip_special_tokens=True)

        print("✅ Model result: ", result )
        return jsonify({"recommendations": result})
    
    except Exception as e: 
        print("❌ Error in /recommend:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000)
