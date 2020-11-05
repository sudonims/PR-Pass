import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  runApp(PRPass());
}

class PRPass extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(primaryColor: Colors.purple[900]),
      home: HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  @override
  HomePageState createState() => HomePageState();
}

class HomePageState extends State<HomePage> {
  String plainText = '';
  String number = '';

  String generatePassword_(String plainText, String number) {
    return plainText + number;
  }

  Widget _getInput() {
    return Container(
      child: Center(child: inputFields()),
      padding: const EdgeInsets.all(20.0),
    );
  }

  Widget inputFields() {
    return Form(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          TextField(
            decoration: InputDecoration(
                border: OutlineInputBorder(), labelText: 'Enter Lucky Number'),
            onChanged: (String value) {
              plainText = value;
            },
          ),
          Divider(
            height: 20,
          ),
          TextField(
            decoration: InputDecoration(
                border: OutlineInputBorder(), labelText: 'Enter Pass Phrase'),
            onChanged: (String val) {
              number = val;
            },
          ),
          Divider(
            height: 20,
          ),
          OutlineButton(
            onPressed: () async {
              await showDialog<void>(
                  context: context,
                  builder: (BuildContext context) {
                    return AlertDialog(
                      title: const Text('Generated Password'),
                      content: Text(generatePassword_(plainText, number)),
                      actions: <Widget>[
                        FlatButton(
                          onPressed: () {
                            Navigator.pop(context);
                          },
                          child: const Text('OK'),
                        ),
                        FlatButton(
                            onPressed: () async {
                              Navigator.pop(context);
                              await Clipboard.setData(new ClipboardData(
                                      text:
                                          generatePassword_(plainText, number)))
                                  .then((_) {
                                Scaffold.of(context).showSnackBar(
                                    SnackBar(content: Text("Copied")));
                              });
                            },
                            child: const Text('Copy to Clipboard'))
                      ],
                    );
                  });
            },
            child: Text("Generate Password"),
            borderSide: BorderSide(color: Colors.purple[900]),
          )
        ],
      ),
    );
  }

  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('PR Pass'),
      ),
      body: _getInput(),
    );
  }
}
