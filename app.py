import sys
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def app():
  return render_template('app.html')

if __name__ == '__main__':
  # Check if we should run in production
  if len(sys.argv) >= 2 and sys.argv[2] == 'prod':
    print 'Running app in production'
  else:
    print 'Running app in development'
    app.debug = True

  app.run()
