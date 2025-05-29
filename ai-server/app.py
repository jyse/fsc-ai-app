from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

app = Flask(__name__)

# Load model and tokenizer
model_path = "./trained_model"
# tokenizer = AutoTokenizer.from_pretrained(model_path)
# model = AutoModelForSeq2SeqLM.from_pretrained(model_path)
# Temporarily change these lines to test base model:
tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-small")
model = AutoModelForSeq2SeqLM.from_pretrained("google/flan-t5-small")

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
        print(repr(prompt))  # Shows exact characters including spaces

        # Tokenize input
        inputs = tokenizer(prompt, return_tensors="pt", truncation=True, max_length=512)
        inputs = {k: v.to(device) for k, v in inputs.items()}
        print("🔍 Input token count:", inputs['input_ids'].shape[1])

        # Generate output
        outputs = model.generate(
            **inputs,
            min_new_tokens=100,
            max_new_tokens=600,
            temperature=0.8,
            do_sample=True,         
            num_beams=1,
            # eos_token_id=tokenizer.eos_token_id,  # Comment this out
            pad_token_id=tokenizer.pad_token_id
        )

        print("🔍 Total output token count:", outputs[0].shape[0])

        # Show FULL output (includes input + generated)
        full_result = tokenizer.decode(outputs[0], skip_special_tokens=True)
        print("🔍 FULL model output (input + generated):")
        print(repr(full_result))

        # Extract ONLY the generated part (this is key!)
        input_length = inputs['input_ids'].shape[1]
        generated_tokens = outputs[0][input_length:]
        result = tokenizer.decode(generated_tokens, skip_special_tokens=True)

        print("🔍 GENERATED part only:")
        print(repr(result))
        print("✅ Final result length:", len(result))

        return jsonify({"recommendations": result})
    
    except Exception as e: 
        print("❌ Error in /recommend:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000)
