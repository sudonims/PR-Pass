import 'package:flutter/material.dart';

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
  Widget _getInput() {
    return Container(
      child: Center(
        child: TextField(
          decoration: InputDecoration(
              border: OutlineInputBorder(), labelText: 'Enter Lucky Number'),
        ),
      ),
      padding: const EdgeInsets.all(20.0),
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
