import pathlib, csv, json


def get_path():
    return str(pathlib.Path(__file__).parent.absolute()) + '/'


def load_csv(name):
    data = []
    if name[-4:] != '.csv': name = name + '.csv'
    
    with open(get_path() + name) as file:
        reader = csv.reader(file)

        for row in reader:
            data.append(row)
    
    return data


def to_bool(value):
    return True if value == 'TRUE' else False


def csv_to_json(row):
    return {
        'name':   row[0],
        'ticker': row[1],
        'issues': {
            'Animal Testing':         to_bool(row[2]),
            'Nuclear Weapons':        to_bool(row[3]),
            'Coal Power':             to_bool(row[4]),
            'Rainforest Destruction': to_bool(row[5])
        }
    }


def convert(data):
    output = []
    for row in data:
        company = csv_to_json(row)
        output.append(company)
    
    return output


def save_json(data, name):
    with open(get_path() + name + '.json', 'w') as f:
        f.write(json.dumps(data))


filename = 'company_exclusions'

input  = load_csv(filename)
output = convert(input)
save_json(output, filename)
