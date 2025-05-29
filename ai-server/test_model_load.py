from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

try:
    model = AutoModelForSeq2SeqLM.from_pretrained("./trained_model")
    tokenizer = AutoTokenizer.from_pretrained("./trained_model")
    print("✅ Model loaded successfully.")
except Exception as e:
    print("❌ Failed to load model:", e)
