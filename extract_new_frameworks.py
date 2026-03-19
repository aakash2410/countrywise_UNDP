import pandas as pd
import json

file_path = "Master Sheet I UNDP Digital Transformation Project I Artha Global I Kalpa Impact.xlsx"

try:
    xls = pd.ExcelFile(file_path)
    print("Sheets available:", xls.sheet_names)
    
    # Dump "New Framework"
    if "New Framework" in xls.sheet_names:
        df_new_framework = pd.read_excel(xls, sheet_name="New Framework").fillna("")
        df_new_framework.to_json("New_Framework.json", orient="records", indent=4)
        print("Generated New_Framework.json")

    if "Malaysian Framework" in xls.sheet_names:
        df_malaysia = pd.read_excel(xls, sheet_name="Malaysian Framework").fillna("")
        df_malaysia.to_json("Malaysian_Framework.json", orient="records", indent=4)
        print("Generated Malaysian_Framework.json")

    if "Cambodian Framework" in xls.sheet_names:
        df_cambodia = pd.read_excel(xls, sheet_name="Cambodian Framework").fillna("")
        df_cambodia.to_json("Cambodian_Framework.json", orient="records", indent=4)
        print("Generated Cambodian_Framework.json")

except Exception as e:
    print("Error:", e)
