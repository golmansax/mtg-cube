from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def cube():
  return render_template('cube.html')

if __name__ == '__main__':
  app.run()
