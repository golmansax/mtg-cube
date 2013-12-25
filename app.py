import sys
from flask import Flask, render_template, url_for
app = Flask(__name__)

@app.route('/')
def app_main():
  return render_template('app.html')

@app.template_filter('url_for_asset')
def url_for_asset_filter(filename):
  return url_for('static', filename=('assets/%s' % filename))

if __name__ == '__main__':
  # Check if we should run in production
  if len(sys.argv) >= 3 and sys.argv[2] == 'prod':
    # Production
    pass
  else:
    # Development
    app.debug = True

  app.run()
