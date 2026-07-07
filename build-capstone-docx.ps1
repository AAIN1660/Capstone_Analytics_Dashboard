# Wrapper: builds submission Word doc via python-docx (better formatting than COM)
$ErrorActionPreference = "Stop"
python "$PSScriptRoot\build_capstone_docx.py" "$PSScriptRoot\Module_15_Capstone_Submission.docx"
