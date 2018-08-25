/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  PermissionsAndroid
} from "react-native";
import {
  Container,
  Header,
  Tab,
  Tabs,
  Left,
  Title,
  Button,
  Icon,
  Body,
  Right,
  List,
  ListItem
} from "native-base";
import Contacts from "react-native-contacts";
import { createStackNavigator } from "react-navigation";

function AlignList(props) {
  const contacts = props.contacts;
  const list = contacts.map(
    (u, i) =>
      u.phoneNumbers.length > 0 && (
        <ListItem key={i} style={{ flex: 2, flexDirection: "row" }}>
          <Left>
            <Text>{u.givenName}</Text>
          </Left>
          <Right style={{ flex: 1 }}>
            <Text>{u.phoneNumbers[0].number}</Text>
          </Right>
        </ListItem>
      )
  );
  return list;
}
class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}
export class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { grantedList: false, contacts: [], loader: false };
    this.getContacts = this.getContacts.bind(this);
  }
  componentDidMount() {
    this.getContacts();
  }
  async getContacts() {
    try {
      const granted = await PermissionsAndroid.request(
        "android.permission.READ_CONTACTS"
      );
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
  }

  render() {
    return (
      <Container>
        <Header hasTabs>
          <Left>
            {/* <Button transparent>
               <Icon name='arrow-back' />
            </Button> */}
          </Left>
          <Body>
            <Title>First App</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>
        <Tabs>
          <Tab heading="Contacts">
            <Container>
              <ScrollView>
                {this.state.loader && (
                  <ActivityIndicator size="large" color="#0000ff" />
                )}
                <Button
                  full
                  rounded
                  success
                  onPress={() => this.props.navigation.navigate("Details")}
                >
                  <Text>Details</Text>
                </Button>
                <List>
                  {this.state.grantedList && (
                    <AlignList contacts={this.state.contacts} />
                  )}
                </List>
              </ScrollView>
            </Container>
          </Tab>
          <Tab heading="SMS">
            <Text>Work is under progress</Text>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: Greeting,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
