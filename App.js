import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      const sendRegistrationData = async () => {
        try {
          const response = await fetch("https://84a716c4489b46638ccbcd5b6caf7e91.api.mockbin.io/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, phone }),
          });
          const data = await response.json();
          Alert.alert("Success", "Registration successful!", [{ text: "OK" }]);
          console.log("Response:", data);
        } catch (error) {
          Alert.alert("Error", "Something went wrong. Please try again.");
          console.error("Error:", error);
        }
        setSubmitted(false);
      };
      sendRegistrationData();
    }
  }, [submitted]);

  const handleSubmit = () => {
    if (!name || !email || !phone) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    setSubmitted(true);
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
        />
        <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
        />
        <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={phone}
            onChangeText={setPhone}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Register </Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffeb3b",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ff5722",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "#ff9800",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#4caf50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default App;
