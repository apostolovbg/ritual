# RITUAL Backend

This repository contains the backend API for the RITUAL platform. The project fo
llows a backend-first approach described in `AGENTS.json`.

## Setup

1. Create a virtual environment and install dependencies:

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

2. Run tests:

```bash
pytest -q
```

3. Start the development server:

```bash
uvicorn app.main:app --reload
```

## Documentation

- `AGENTS.md` contains development guidelines.
- `CHANGELOG.md` tracks project history.

