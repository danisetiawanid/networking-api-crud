import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import axios from "axios";

export default function App() {
  const [todo, setTodo] = useState([]);

  const [todoTitle, setTodoTitle] = useState('');
  let sortedTodo = [...todo].sort((a, b) => b.id - a.id);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(function (response) {
        setTodo(response.data);
        console.log(response.data);
      });
  }, []);

  const addTodo = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title: todoTitle,
        completed: false,
      })
      .then(function (response) {
        setTodo([...todo, response.data]);
        console.log(response.data);
    })
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>Create Post</Text>
        <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        onChangeText={text => setTodoTitle(text)}
        value={todoTitle}
        placeholder="Enter todo title"
      />
        <Button title="Submit" onPress={addTodo}></Button>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 10,
            marginTop: 20,
          }}
        >
          Todo App
        </Text>
        <FlatList
          data={sortedTodo}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardTodo}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 2 }}>
                  <Text style={styles.todoTitle}>{item.title}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  {item.completed ? (
                    <Text
                      style={{
                        padding: 8,
                        backgroundColor: "green",
                        color: "white",
                      }}
                    >
                      Completed
                    </Text>
                  ) : (
                    <Text
                      style={{
                        padding: 8,
                        backgroundColor: "yellow",
                        color: "black",
                      }}
                    >
                      Pending
                    </Text>
                  )}
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Button title="Edit"></Button>
                </View>
                <View style={{ flex: 1 }} >
                  <Button title="Delete" color={"red"}></Button>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 20,
  },

  cardTodo: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "gray",
    padding: 20,

  },

  todoTitle: {
    fontSize: 14,
    fontWeight: "bold",

    marginBottom: 10,
    marginTop: 10,
  },
});
