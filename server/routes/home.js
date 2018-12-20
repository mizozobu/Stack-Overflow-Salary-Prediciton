const request = require('request');
const sql = require('mssql');
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
          'LanguageWorkedWith_TypeScript',
          'MilitaryUS',
          'IDE_Sublime Text',
          'Country',
          'SalaryType',
          'RaceEthnicity_White or of European descent',
          'AgreeDisagree2',
          'DevType_Full-stack developer',
          'FrameworkWorkedWith_Angular',
          'Waketime',
          'ConvertedSalaryInt',
          'FrameworkWorkedWith_Node js',
          'PlatformWorkedWith_Android',
          'LanguageWorkedWith_SQL',
          'SelfTaughtTypes_Online developer communities other than Stack Overflow (ex  forums_ listservs_ IRC channels_ etc )',
          'CommunicationTools_Trello'
        ],
        'Values': [
          [
            data['typescript'] || 'No',
            data['militaryus'] || 'NA',
            data['sublime_text'] || 'No',
            data['country'],
            'Yearly',
            data['european'] || 'No',
            data['agreedisagree2'] || 'NA',
            data['full-stackdeveloper'] || 'No',
            data['angular'] || 'No',
            data['waketime'] || 'NA',
            '0',
            data['node.js'] || 'No',
            data['android'] || 'No',
            data['sql'] || 'No',
            data['onlinecommunity'] || 'No',
            data['trello'] || 'No',
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
  const data = req.body;

  const body = {
    'Inputs': {
      'input1': {
        'ColumnNames': [
          'Respondent',
          'LanguageWorkedWith',
          'Rating'
        ],
        'Values': [
          [
            '387',
            data.language,
            '1'
          ],
        ]
      }
    },
    'GlobalParameters': {}
  };

  const options = {
    method: 'POST',
    url: 'https://ussouthcentral.services.azureml.net/workspaces/e2932e034bfe4057a75aa5651e1ff623/services/bf08ae14b7794c0686b0670f4f8ba4f7/execute?api-version=2.0&details=true',
    headers: {
      'Authorization': 'Bearer TMCyWRSzVIqjbEXumIuqd6yQWJezx8z8VbBlzn+5O4KK2CcDXs8iSut+NxEYIpJh/CLztG/ILDN6ypZWmqkomQ==',
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
    const result = r.Results.output1.value.Values[0];

    return res.json({
      ok: true,
      result: result,
    });
  });
};

api.save = async(req, res) => {
  const data = queryStringToJSON(req.body.data);
  const more = queryStringToJSON(req.body.more);

  try {
    if (!Number.isInteger(parseInt(more['salary']))) {
      throw 'salary data type invalied';
    }

    await sql.query`
      INSERT INTO StackOverFlowTable (
        [Country],
        [SalaryType],
        [ConvertedSalary],
        [AgreeDisagree2],
        [WakeTime],
        [MilitaryUS],
        [LanguageWorkedWith_JavaScript],
        [LanguageWorkedWith_Python],
        [LanguageWorkedWith_TypeScript],
        [LanguageWorkedWith_HTML],
        [LanguageWorkedWith_CSS],
        [LanguageWorkedWith_Bash Shell],
        [LanguageWorkedWith_C#],
        [LanguageWorkedWith_SQL],
        [LanguageWorkedWith_C],
        [LanguageWorkedWith_C++],
        [LanguageWorkedWith_Java],
        [LanguageWorkedWith_Matlab],
        [LanguageWorkedWith_R],
        [LanguageWorkedWith_Assembly],
        [LanguageWorkedWith_CoffeeScript],
        [LanguageWorkedWith_Erlang],
        [LanguageWorkedWith_Go],
        [LanguageWorkedWith_Lua],
        [LanguageWorkedWith_Ruby],
        [LanguageWorkedWith_PHP],
        [LanguageWorkedWith_VB NET],
        [LanguageWorkedWith_Swift],
        [LanguageWorkedWith_Groovy],
        [LanguageWorkedWith_Kotlin],
        [LanguageWorkedWith_Objective-C],
        [LanguageWorkedWith_Scala],
        [LanguageWorkedWith_F#],
        [LanguageWorkedWith_Haskell],
        [LanguageWorkedWith_Rust],
        [LanguageWorkedWith_Julia],
        [LanguageWorkedWith_VBA],
        [LanguageWorkedWith_Perl],
        [LanguageWorkedWith_Cobol],
        [LanguageWorkedWith_Visual Basic 6],
        [LanguageWorkedWith_Delphi Object Pascal],
        [LanguageWorkedWith_Hack],
        [LanguageWorkedWith_Clojure],
        [LanguageWorkedWith_Ocaml],
        [FrameworkWorkedWith_Django],
        [FrameworkWorkedWith_React],
        [FrameworkWorkedWith_Angular],
        [FrameworkWorkedWith_Node js],
        [FrameworkWorkedWith_Hadoop],
        [FrameworkWorkedWith_Spark],
        [FrameworkWorkedWith_Spring],
        [FrameworkWorkedWith_ NET Core],
        [FrameworkWorkedWith_Cordova],
        [FrameworkWorkedWith_Xamarin],
        [FrameworkWorkedWith_TensorFlow],
        [FrameworkWorkedWith_Torch PyTorch],
        [PlatformWorkedWith_AWS],
        [PlatformWorkedWith_Azure],
        [PlatformWorkedWith_Linux],
        [PlatformWorkedWith_Firebase],
        [PlatformWorkedWith_Arduino],
        [PlatformWorkedWith_Windows Desktop or Server],
        [PlatformWorkedWith_Heroku],
        [PlatformWorkedWith_Amazon Echo],
        [PlatformWorkedWith_iOS],
        [PlatformWorkedWith_Mac OS],
        [PlatformWorkedWith_Serverless],
        [PlatformWorkedWith_Android],
        [PlatformWorkedWith_WordPress],
        [PlatformWorkedWith_Drupal],
        [PlatformWorkedWith_Google Cloud Platform App Engine],
        [PlatformWorkedWith_Raspberry Pi],
        [PlatformWorkedWith_SharePoint],
        [PlatformWorkedWith_IBM Cloud or Watson],
        [PlatformWorkedWith_Mainframe],
        [PlatformWorkedWith_Apple Watch or Apple TV],
        [PlatformWorkedWith_ESP8266],
        [PlatformWorkedWith_Gaming console],
        [PlatformWorkedWith_Predix],
        [PlatformWorkedWith_Windows Phone],
        [PlatformWorkedWith_Salesforce],
        [PlatformWorkedWith_Google Home],
        [IDE_Komodo],
        [IDE_Vim],
        [IDE_Visual Studio Code],
        [IDE_IPython   Jupyter],
        [IDE_Sublime Text],
        [IDE_Visual Studio],
        [IDE_Notepad++],
        [IDE_IntelliJ],
        [IDE_PyCharm],
        [IDE_Atom],
        [IDE_Eclipse],
        [IDE_NetBeans],
        [IDE_Android Studio],
        [IDE_Coda],
        [IDE_Xcode],
        [IDE_PHPStorm],
        [IDE_RStudio],
        [IDE_Emacs],
        [IDE_RubyMine],
        [IDE_Light Table],
        [IDE_Zend],
        [IDE_TextMate],
        [DevType_Full-stack developer],
        [DevType_Database administrator],
        [DevType_DevOps specialist],
        [DevType_System administrator],
        [DevType_Engineering manager],
        [DevType_Data or business analyst],
        [DevType_Desktop or enterprise applications developer],
        [DevType_Game or graphics developer],
        [DevType_QA or test developer],
        [DevType_Back-end developer],
        [DevType_Front-end developer],
        [DevType_Designer],
        [DevType_C-suite executive (CEO_ CTO_ etc )],
        [DevType_Mobile developer],
        [DevType_Data scientist or machine learning specialist],
        [DevType_Marketing or sales professional],
        [DevType_Product manager],
        [DevType_Embedded applications or devices developer],
        [DevType_Educator or academic researcher],
        [CommunicationTools_Slack],
        [CommunicationTools_Confluence],
        [CommunicationTools_Office   productivity suite (Microsoft Office_ Google Suite_ etc )],
        [CommunicationTools_Other wiki tool (Github_ Google Sites_ proprietary software_ etc )],
        [CommunicationTools_Jira],
        [CommunicationTools_Other chat system (IRC_ proprietary software_ etc )],
        [CommunicationTools_Stack Overflow Enterprise],
        [CommunicationTools_Facebook],
        [CommunicationTools_Google Hangouts Chat],
        [CommunicationTools_Trello],
        [CommunicationTools_HipChat],
        [SelfTaughtTypes_The official documentation and or standards for the technology],
        [SelfTaughtTypes_A book or e-book from O'Reilly_ Apress_ or a similar publisher],
        [SelfTaughtTypes_Questions & answers on Stack Overflow],
        [SelfTaughtTypes_Online developer communities other than Stack Overflow (ex  forums_ listservs_ IRC channels_ etc )],
        [SelfTaughtTypes_The technology's online help system],
        [SelfTaughtTypes_A college university computer science or software engineering book],
        [SelfTaughtTypes_Tapping your network of friends_ family_ and peers versed in the technology],
        [SelfTaughtTypes_Pre-scheduled tutoring or mentoring sessions with a friend or colleague],
        [SelfTaughtTypes_Internal Wikis_ chat rooms_ or documentation set up by my company for employees],
        [RaceEthnicity_Black or of African descent],
        [RaceEthnicity_White or of European descent],
        [RaceEthnicity_Hispanic or Latino Latina],
        [RaceEthnicity_East Asian],
        [RaceEthnicity_Middle Eastern],
        [RaceEthnicity_Native American_ Pacific Islander_ or Indigenous Australian],
        [RaceEthnicity_South Asian]
      )
      VALUES (
        ${data['country'] || 'NA'},
        ${more['salaryType'] || 'NA'},
        ${more['salary'] || 'NA'},
        ${data['agreedisagree2'] || 'NA'},
        ${data['waketime'] || 'NA'},
        ${data['militaryus'] || 'NA'},

        ${data['javascript'] || 'No'},
        ${data['python'] || 'No'},
        ${data['typescript'] || 'No'},
        ${data['html'] || 'No'},
        ${data['css'] || 'No'},
        ${data['bash/shell'] || 'No'},
        ${data['c#'] || 'No'},
        ${data['sql'] || 'No'},
        ${data['c'] || 'No'},
        ${data['c++'] || 'No'},
        ${data['java'] || 'No'},
        ${data['matlab'] || 'No'},
        ${data['R'] || 'No'},
        ${data['assembly'] || 'No'},
        ${data['coffeescript'] || 'No'},
        ${data['erlang'] || 'No'},
        ${data['go'] || 'No'},
        ${data['lua'] || 'No'},
        ${data['ruby'] || 'No'},
        ${data['php'] || 'No'},
        ${data['vb.net'] || 'No'},
        ${data['swift'] || 'No'},
        ${data['groovy'] || 'No'},
        ${data['kotlin'] || 'No'},
        ${data['objective-c'] || 'No'},
        ${data['scala'] || 'No'},
        ${data['f#'] || 'No'},
        ${data['haskell'] || 'No'},
        ${data['rust'] || 'No'},
        ${data['julia'] || 'No'},
        ${data['vba'] || 'No'},
        ${data['perl'] || 'No'},
        ${data['cobol'] || 'No'},
        ${data['visual_basic_6'] || 'No'},
        ${data['delphi/object_pascal'] || 'No'},
        ${data['hack'] || 'No'},
        ${data['clojure'] || 'No'},
        ${data['ocaml'] || 'No'},

        ${data['django'] || 'No'},
        ${data['react'] || 'No'},
        ${data['angular'] || 'No'},
        ${data['node.js'] || 'No'},
        ${data['hadoop'] || 'No'},
        ${data['spark'] || 'No'},
        ${data['spring'] || 'No'},
        ${data['.net_Core'] || 'No'},
        ${data['cordova'] || 'No'},
        ${data['Xamarin'] || 'No'},
        ${data['tensorflow'] || 'No'},
        ${data['torch/pyTorch'] || 'No'},

        ${data['aws'] || 'No'},
        ${data['azure'] || 'No'},
        ${data['linux'] || 'No'},
        ${data['firebase'] || 'No'},
        ${data['arduino'] || 'No'},
        ${data['windows_desktop_or_server'] || 'No'},
        ${data['heroku'] || 'No'},
        ${data['amazon_echo'] || 'No'},
        ${data['ios'] || 'No'},
        ${data['mac_os'] || 'No'},
        ${data['serverless'] || 'No'},
        ${data['android'] || 'No'},
        ${data['wordpress'] || 'No'},
        ${data['drupal'] || 'No'},
        ${data['google_cloud_platform/app_engine'] || 'No'},
        ${data['rasberry_pi'] || 'No'},
        ${data['sharepoint'] || 'No'},
        ${data['ibm_cloud_or_watson'] || 'No'},
        ${data['mainframe'] || 'No'},
        ${data['apple_watch_or_apple_tv'] || 'No'},
        ${data['esp8266'] || 'No'},
        ${data['gaming_console'] || 'No'},
        ${data['predix'] || 'No'},
        ${data['windows_phone'] || 'No'},
        ${data['salesforce'] || 'No'},
        ${data['google_home'] || 'No'},

        ${data['komodo'] || 'No'},
        ${data['vim'] || 'No'},
        ${data['visual_studio_code'] || 'No'},
        ${data['ipython/jupyter'] || 'No'},
        ${data['sublime_text'] || 'No'},
        ${data['visual_studio'] || 'No'},
        ${data['notepad++'] || 'No'},
        ${data['intellij'] || 'No'},
        ${data['pycharm'] || 'No'},
        ${data['atom'] || 'No'},
        ${data['eclipse'] || 'No'},
        ${data['netbeans'] || 'No'},
        ${data['android_studio'] || 'No'},
        ${data['coda'] || 'No'},
        ${data['xcode'] || 'No'},
        ${data['phpstorm'] || 'No'},
        ${data['rstudio'] || 'No'},
        ${data['emacs'] || 'No'},
        ${data['rubymine'] || 'No'},
        ${data['light_table'] || 'No'},
        ${data['zend'] || 'No'},
        ${data['textmate'] || 'No'},

        ${data['full-stackdeveloper'] || 'No'},
        ${data['databaseadministrator'] || 'No'},
        ${data['devOpsspecialist'] || 'No'},
        ${data['systemadministrator'] || 'No'},
        ${data['engineeringmanager'] || 'No'},
        ${data['dataorbusinessanalyst'] || 'No'},
        ${data['desktoporenterpriseapplicationsdeveloper'] || 'No'},
        ${data['gameorgraphicsdeveloper'] || 'No'},
        ${data['QAortestdeveloper'] || 'No'},
        ${data['back-enddeveloper'] || 'No'},
        ${data['front-enddeveloper'] || 'No'},
        ${data['designer'] || 'No'},
        ${data['c-suiteexecutive'] || 'No'},
        ${data['mobiledeveloper'] || 'No'},
        ${data['datascientistormachinelearningspecialist'] || 'No'},
        ${data['marketingorsalesprofessional'] || 'No'},
        ${data['productmanager'] || 'No'},
        ${data['embeddedapplicationsordevicesdeveloper'] || 'No'},
        ${data['educatororacademicresearcher'] || 'No'},

        ${data['slack'] || 'No'},
        ${data['confluence'] || 'No'},
        ${data['office/suite'] || 'No'},
        ${data['otherwiki'] || 'No'},
        ${data['jira'] || 'No'},
        ${data['otherchat'] || 'No'},
        ${data['stackoverflowenterprise'] || 'No'},
        ${data['facebook'] || 'No'},
        ${data['googlehangouts/chat'] || 'No'},
        ${data['trello'] || 'No'},
        ${data['hipChat'] || 'No'},

        ${data['officialdocumentation'] || 'No'},
        ${data['book'] || 'No'},
        ${data['stackoverflow'] || 'No'},
        ${data['onlinecommunity'] || 'No'},
        ${data['onlinehelp'] || 'No'},
        ${data['college'] || 'No'},
        ${data['friends'] || 'No'},
        ${data['tutoring'] || 'No'},
        ${data['internalwiki'] || 'No'},

        ${data['black'] || 'No'},
        ${data['european'] || 'No'},
        ${data['hispanic'] || 'No'},
        ${data['eastasian'] || 'No'},
        ${data['middleeastern'] || 'No'},
        ${data['nativeamerican'] || 'No'},
        ${data['southasian'] || 'No'}
      );
    `;

    return res.json({ ok: true });
  }
  catch (err) {
    logger.error(err);
    return res.sendStatus(500);
  }
};

actions.tableau = async(req, res) => {
  return res.render('tableau');
};

function queryStringToJSON(queryString) {
  if(queryString.indexOf('?') > -1){
    queryString = queryString.split('?')[1];
  }
  var pairs = queryString.split('&');
  var result = {};
  pairs.forEach(function(pair) {
    pair = pair.split('=');
    result[pair[0]] = decodeURIComponent(pair[1] || '');
  });
  return result;
}

module.exports = {
  actions,
  api,
};
