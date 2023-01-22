from setup import conn_app, workdir

conn_app.add_api(f"{workdir}/api.yaml")

if __name__ == '__main__':
    conn_app.run(host="0.0.0.0", port=8000, debug=True)
