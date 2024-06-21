import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Employee Management',
      theme: ThemeData(
        primarySwatch: Colors.blue, // MaterialColor is not nullable, no need for `const`
      ),
      home: const EmployeeListScreen(),
    );
  }
}

class Employee {
  final String name;
  final int age;
  final DateTime joiningDate;
  final bool isActive;

  const Employee({
    required this.name,
    required this.age,
    required this.joiningDate,
    required this.isActive,
  });
}

class EmployeeListScreen extends StatefulWidget {
  const EmployeeListScreen({Key? key}) : super(key: key);

  @override
  _EmployeeListScreenState createState() => _EmployeeListScreenState();
}

class _EmployeeListScreenState extends State<EmployeeListScreen> {
  late List<Employee> employees = [];

  @override
  void initState() {
    super.initState();
    fetchEmployees();
  }

  Future<void> fetchEmployees() async {
    final response = await http.get(Uri.parse('http://192.168.29.190:5000/employee'));
    if (response.statusCode == 200) {
      final List<dynamic> jsonData = json.decode(response.body);
      setState(() {
        employees = jsonData.map((e) => Employee(
          name: e['name'],
          age: e['age'],
          joiningDate: DateTime.parse(e['joiningDate']),
          isActive: e['isActive'],
        )).toList();
      });
    } else {
      throw Exception('Failed to load employees');
    }
  }

  bool isFlagged(Employee employee) {
    final duration = DateTime.now().difference(employee.joiningDate);
    final years = duration.inDays ~/ 365;
    return employee.isActive && years >= 5;
  }
  

 @override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(
      title: const Text('Employee List'),
    ),
    body: employees.isEmpty
        ? const Center(child: CircularProgressIndicator())
        : ListView.builder(
            itemCount: employees.length,
            itemBuilder: (context, index) {
              final employee = employees[index];
              final bool isFlaggedEmployee = isFlagged(employee);
              return ListTile(
                title: Text(
                  employee.name,
                  style: TextStyle(
                    color: isFlaggedEmployee ? Color(0xFFDD0611) : null, // Set text color for flagged employee
                  ),
                ),
                subtitle: Text(employee.age.toString()),
                tileColor: isFlaggedEmployee ? Color(0xFFEDF2F8) : null, // Set background color for flagged employee
                trailing: isFlaggedEmployee ? const Icon(Icons.flag, color: Colors.green) : null,
              );
            },
          ),
  );
}





}
