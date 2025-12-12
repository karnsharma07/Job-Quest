import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Modal } from "react-native";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [securePass, setSecurePass] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const onRegister = () => {
    const emailRegex = /[^@]+@[^@]+\.[^@]+/;

    if (!username.trim()) return setError("Username is required.");
    if (!email.trim()) return setError("Email is required.");
    if (!emailRegex.test(email)) return setError("Please enter a valid email address.");
    if (!password) return setError("Password is required.");
    if (password.length < 8) return setError("Password must be at least 8 characters.");

    setError(null);
    setConfirmVisible(true);
  };

  const onPasswordChange = (text) => {
    setPassword(text);
    if (!securePass) setTimeout(() => setSecurePass(true), 700);
  };

  const onConfirm = (choice) => {
    setConfirmVisible(false);
    if (choice === "Y") setSuccessVisible(true);
  };

  const CustomButton = ({ title, onPress, color }) => (
    <TouchableOpacity onPress={onPress} style={[styles.customButton, { backgroundColor: color }]}>
      <Text style={styles.customButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={onPasswordChange}
        secureTextEntry={securePass}
      />

      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

      <CustomButton title="Register" onPress={onRegister} color="#2196F3" />

      <Text>Already have an account?</Text>
      <Button title="Log in" onPress={() => navigation.navigate("Login")} />

      <Modal transparent visible={confirmVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            <Text style={styles.modalText}>Are you sure you want to register?</Text>
            <View style={styles.buttonRow}>
              <CustomButton title="No" onPress={() => onConfirm("N")} color="#f44336" />
              <CustomButton title="Yes" onPress={() => onConfirm("Y")} color="#4CAF50" />
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent visible={successVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalInner}>
            <Text style={styles.modalText}>Registration Successful!</Text>
            <CustomButton title="OK" onPress={() => setSuccessVisible(false)} color="#2196F3" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalInner: {
    width: "80%",
    backgroundColor: "white",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
    elevation: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 25,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  customButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  customButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
