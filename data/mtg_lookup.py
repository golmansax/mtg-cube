#!/usr/bin/python

import os, re, json

DATABASE_FILE = 'dls/mtg_database.txt'
COLOR_MAP = {'W' : 'White', 'B': 'Black', 'U': 'Blue', 'R': 'Red', 'G': 'Green'}
ACT_TYPES = ['Enchant', 'Creature', 'Land', 'Sorcery', 'Instant', 'Planeswalker', 'Artifact']
COLOR_REGEX = '[wburgWBURG]'


# lets read in the database and create a map
fin = open(DATABASE_FILE, 'r')

def make_card(text):
  ret = {}
  ret['name'] = text[0]
  # need flag for cards with no mana cost or are flip cards
  extra_lines = 1
  if 'Land' in text[1]:
    ret['group'] = 'Land'
    extra_lines = 0
  elif re.search('\(%s\/%s\)' % (COLOR_REGEX, COLOR_REGEX), text[1]):
    ret['group'] = 'Multicolored'
  elif re.search('\(%s\/p\)' % COLOR_REGEX, text[1])
    # TODO lower to upper and look in COLORMAP
  elif re.search('\(\d\/%s\)' % COLOR_REGEX, text[1])
    # TODO lower to upper and look in COLORMAP
  elif not re.search('^X*\d*[A-Z]*$', text[1]):
    ret['group'] = 'Other'
    extra_lines = 0
  elif not re.search(COLOR_REGEX, text[1]): ret['group'] = 'Colorless'
  else:
    # remove X's
    letters = letters.replace('X', '')
    # remove the numbers and see if the letters duplicate
    letters = re.sub('^\d*([^A-Z])', '', text[1])

    first = letters[0]
    is_multi = False
    for c in letters:
      if c != first:
        is_multi = True
        break

    if is_multi: ret['group'] = 'Multicolored'
    else: ret['group'] = COLOR_MAP[first]

  # now lets add the rest of the data
  # find converted mana cost
  conv_cost = 0
  if extra_lines > 0:
    ret['mana_cost'] = text[1]
    for c in ret['mana_cost']:
      if c >= '0' and c <= '9': conv_cost += int(c)
      elif re.search(COLOR_REGEX, c): conv_cost += 1
  ret['conv_cost'] = conv_cost

  ret['type'] = text[1 + extra_lines]
  # find actual card type
  for act_type in ACT_TYPES:
    if act_type in ret['type']:
      if act_type == 'Enchant': ret['act_type'] = 'Enchantment'
      else: ret['act_type'] = act_type
      break
  if 'act_type' not in ret: ret['act_type'] = 'Other'

  if ret['act_type'] == 'Creature':
    pt = text[2 + extra_lines].split('/')
    ret['p'] = pt[0]
    ret['t'] = pt[1]
    extra_lines = 2

  ret['text'] = '|'.join(text[(2 + extra_lines):(len(text) - 1)])
  return ret
# end make card

card_map = {}
name = ''
text = []
for line in fin:
  line = line.rstrip()
  if line == '':
    if name == '': continue
    card_map[name] = make_card(text)
    name = ''
    text = []
  else:
    if name == '': name = line
    text.append(line)
fin.close()

print 'Indexed %d cards' % len(card_map)

# assuming d[k] = list of v's
def smart_append(d, k, v):
  if k in d: d[k].append(v)
  else: d[k] = [v]

# create an array of used cards for each color/land/artifact
cube_map = {}
for fname in os.listdir('raw'):
  if fname.endswith('.mwDeck'):
    fin = open('data/%s' % fname, 'r')
    for line in fin:
      line = line.rstrip()
      if not ']' in line: continue
      line = re.sub('^.*\]\s*', '', line)
      if line in card_map:
        card = card_map[line]
        smart_append(cube_map, card['group'], card)
    fin.close()

for group, cards in cube_map.items():
  print 'Added %d %s cards' % (len(cards), group)

fout = open('generated/cube_json.txt', 'w')
json.dump(cube_map, fout, separators=(',' , ':'))
fout.close()
