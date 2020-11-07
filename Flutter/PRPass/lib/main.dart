import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import './prpass.dart';

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

// class HomePage extends StatefulWidget {
//   @override
//   HomePageState createState() => HomePageState();
// }

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('PR Pass'),
      ),
      body: FormInput(),
    );
  }
}

class FormInput extends StatefulWidget {
  @override
  FormInputState createState() => FormInputState();
}

class FormInputState extends State<FormInput> {
  String plainText = '';
  String number = '';

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
        child: Form(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              TextField(
                decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Enter Lucky Number'),
                onChanged: (String value) {
                  setState(() {
                    number = value;
                  });
                },
              ),
              Divider(
                height: 20,
              ),
              TextField(
                decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Enter Pass Phrase'),
                onChanged: (String val) {
                  setState(() {
                    plainText = val;
                  });
                },
              ),
              Divider(
                height: 20,
              ),
              OutlineButton(
                onPressed: () async {
                  await showDialog<void>(
                      context: context,
                      builder: (BuildContext context_) {
                        return AlertDialog(
                          title: const Text('Generated Password'),
                          content: Text(generatePassword(plainText, number)),
                          actions: <Widget>[
                            FlatButton(
                              onPressed: () {
                                Navigator.pop(context_);
                              },
                              child: const Text('OK'),
                            ),
                            FlatButton(
                                onPressed: () async {
                                  Navigator.pop(context_);
                                  await Clipboard.setData(new ClipboardData(
                                          text: generatePassword(
                                              plainText, number)))
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
        ),
      ),
      padding: const EdgeInsets.all(20.0),
    );
  }
}
