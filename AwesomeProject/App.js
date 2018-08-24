/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  Picker,
  Button,
  ActivityIndicator,
  PermissionsAndroid,
  ProgressBarAndroid,
  WebView
} from "react-native";
import Contacts from "react-native-contacts";

function AlignList(props) {
  const contacts = props.contacts;
  const list = contacts.map(
    (u, i) =>
      u.phoneNumbers.length > 0 && (
        <View key={i} style={{ flex: 2, flexDirection: "row" }}>
          <Text style={{ flex: 1, color: "blue", fontSize: 20 }}>
            {u.givenName}
          </Text>
          <Text style={{ flex: 1, color: "blue", fontSize: 20 }}>
            {u.phoneNumbers[0].number}
          </Text>
        </View>
      )
  );
  return list;
}

export class Greeting extends Component {
  constructor(props) {
    super(props);
    this.state = { grantedList: false, contacts: [], loader: false };
    this.bindText = this.bindText.bind(this);
    this.displayList = this.displayList.bind(this);
  }
  displayList() {
    this.setState({ grantedList: true });
  }
  async bindText() {
    try {
      console.log("in");
      const granted = await PermissionsAndroid.request(
        "android.permission.READ_CONTACTS"
      );
      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({ loader: true });
        Contacts.getAll((err, contacts) => {
          if (err) throw err;
          console.log(contacts);
          this.setState({ loader: false });
          this.setState({ grantedList: true, contacts: contacts });
        });
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
    // this.setState({ text: "alpha" });
  }
  render() {
    return (
      <View>
        <Button
          onPress={this.bindText}
          title="Get Contact List"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <View>
          {this.state.loader && (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </View>
        <View>
          {this.state.grantedList && (
            <AlignList contacts={this.state.contacts} />
          )}
        </View>
      </View>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <ScrollView>
        <Greeting />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
