const request = require('request');
const logger = require('logger')('app.js');

let actions = {};
let api = {};

actions.index = async(req, res) => {
  return res.render('index');
};

actions.predict = async(req, res) => {
  return res.render('predict');
};

api.predict = async(req, res) => {
  const data = req.body;

  const body = {
    'Inputs': {
      'input1': {
        'ColumnNames': [
          'Country',
          'SalaryType',
          'ConvertedSalaryInt',
          'AgreeDisagree2',
          'WakeTime',
          'MilitaryUS',
          'DevType_Full-stack developer',
          'LanguageWorkedWith_SQL',
          'LanguageWorkedWith_TypeScript',
          'PlatformWorkedWith_Android',
          'FrameworkWorkedWith_Angular',
          'FrameworkWorkedWith_Node.js',
          'IDE_Sublime Text',
          'SelfTaughtTypes_Online developer communities other than Stack Overflow (ex. forums, listservs, IRC channels, etc.)',
          'CommunicationTools_Trello',
          'RaceEthnicity_White or of European descent'
        ],
        'Values': [
          [
            data['country'],
            'Yearly',
            '0',
            data['agreedisagree2'] || 'NA',
            data['waketime'] || 'NA',
            data['militaryus'] || 'NA',
            data['full-stackdeveloper'] || 'No',
            data['sql'] || 'No',
            data['typescript'] || 'No',
            data['android'] || 'No',
            data['angular'] || 'No',
            data['node.js'] || 'No',
            data['sublime_text'] || 'No',
            data['onlinecommunity'] || 'No',
            data['trello'] || 'No',
            data['european'] || 'No',
          ]
        ]
      }
    },
    'GlobalParameters': {}
  };

  const options = {
    method: 'POST',
    url: 'https://ussouthcentral.services.azureml.net/workspaces/e2932e034bfe4057a75aa5651e1ff623/services/ff637a43cbfa425196364fba66ee8c12/execute?api-version=2.0&details=true',
    headers: {
      'Authorization': 'Bearer RbWncRDJt1nXGgtBpSCCF3FgLpBZzBOkekQB0cu1LXi9FjW6LGlmhwsMgFeDyhRURviWA+qIWcIZBhyyTDI4DQ==',
      'Content-Type': 'application/json',
    },
    json: false,
    body: JSON.stringify(body),
  };

  request(options, (err, response, body) => {
    if (err) {
      logger.error(JSON.stringify(err));
      return res.json({
        ok: false,
      });
    }

    const r = JSON.parse(response.body);
    const result = r.Results.output1.value.Values[0][0];

    return res.json({
      ok: true,
      result: result,
    });
  });
};

actions.recommend = async(req, res) => {
  return res.render('recommend');
};

api.recommend = async(req, res) => {
  return res.render('recommend');
};

module.exports = {
  actions,
  api,
};
