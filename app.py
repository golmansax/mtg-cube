import sys, ujson
from flask import Flask, render_template, url_for

# Check command line to see if in production
if len(sys.argv) >= 2 and sys.argv[1] == 'prod':
  # In production
  app = Flask(__name__, static_url_path='/mtg-cube/static')
else:
  app = Flask(__name__)
  app.debug = True

@app.route('/mtg-cube')
def app_main():
  fin = open('data/generated/cube_map.json', 'r')
  cube_map_raw = fin.readline()
  fin.close()

  return render_template('app.html',
      # Let's do this the ghetto way to save a json encode/decode
      JS_VARS_FROM_SERVER_JSON=('{cube_map:%s}' % cube_map_raw))

@app.template_filter('url_for_asset')
def url_for_asset_filter(filename):
  return url_for('static', filename=('assets/%s' % filename))

if __name__ == '__main__':
  app.run()
