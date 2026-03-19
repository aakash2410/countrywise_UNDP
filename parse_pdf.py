import PyPDF2

try:
    with open('Deliverable 1_ Scoping Report-3.pdf', 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ''
        for page in reader.pages:
            text += page.extract_text() + '\n'
            
    with open('pdf_dump.txt', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Done extracting PDF to pdf_dump.txt")
except Exception as e:
    print("Error:", e)
