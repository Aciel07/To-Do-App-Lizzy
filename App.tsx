import React, { useEffect } from "react";
import { Text, View, TextInput, Button, FlatList, Dimensions, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom, useAtom } from "jotai";
import Checkbox from "expo-checkbox";

// Zod schema for form validation
const todoSchema = z.object({
  text: z.string().min(1, "Text input is required"),
  selected: z.boolean().optional(),
  selectedTodosAtom: z.string().optional(),
  todosAtom: z.string().optional(),
  asyncStorage: z.string().optional(),
});

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  date: string;
};

// Jotai atoms for state management
const todosAtom = atom<Todo[]>([]);
const selectedTodosAtom = atom<Set<string>>(new Set<string>());

export default function App() {
  const [todos, setTodos] = useAtom(todosAtom);
  const [selectedTodos, setSelectedTodos] = useAtom(selectedTodosAtom);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: { text: "" },
  });
  
  const screenWidth = Dimensions.get("window").width;
  
  // Load todos from AsyncStorage on app start
  useEffect(() => {
    (async () => {
      const storedTodos = await AsyncStorage.getItem("todos");
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    })();
  }, []);

  // Save todos to AsyncStorage whenever they change
  useEffect(() => {
    AsyncStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = ({ text }: { text: string }) => {
    const currentDate = new Date().toLocaleString(); // Format the date
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now().toString(), text, completed: false, date: currentDate },
    ]);
    reset();
  };
  

  const toggleSelection = (id: string) => {
    setSelectedTodos((prev: Set<string>) => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const updateTodo = (id: string, text: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      )
    );
  };

  const deleteSelected = () => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => !selectedTodos.has(todo.id))
    );
    setSelectedTodos(new Set());
  };

  const clearTodos = () => {
    setTodos([]);
    setSelectedTodos(new Set());
  };

  /* UI components */
  return (
    /* Main container */
    <View style={{ flex: 1, backgroundColor: "#1ddd33", justifyContent: "center", alignItems: "center", paddingTop: Platform.OS === "android" ? 25 : 0 }}>

      {/* Container */}
      <View
        style={{
          width: "90%",
          height: "90%",
          backgroundColor: "#fff",
          borderRadius: 10,
          shadowColor: "#8a6e5d",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          padding: 20,
        }}
      >
        {/* Title */}
        <View style={{ backgroundColor: "#640D5F", paddingVertical: 10}}>
          <Text
            style={{
              fontStyle: "italic",
              fontFamily: "ui-rounded",
              fontSize: 30,
              color: "#FFB200",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            L   I   Z   Z   Y
          </Text>
        </View>

        {/* Subtitle */}
        <View style={{ backgroundColor: "#fff", paddingVertical: 10, marginBottom: 15, borderWidth: 2, borderColor: "#FFB200" }}>
          <Text
            style={{
              fontStyle: "normal",
              fontFamily: "monospace",
              fontSize: 12,
              color: "#640D5F",
              fontWeight: "bold",
              textAlign: "center",
              borderColor: "#fff",
            }}
          >
            "Never forget a thing with Lizzy, start listing now!"
          </Text>
        </View>

        {/* Form to add new todo */}
        <View style={{ marginBottom: 15, alignItems: "center" }}>
          <Controller
            control={control}
            name="text"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 5,
                  width: "100%",
                  backgroundColor: "#f9f9f9",
                }}
                placeholder="Type your task here..."
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.text && <Text style={{ color: "red", marginBottom: 10, }}>{errors.text.message}</Text>}
          <Button title="Add Todo" onPress={handleSubmit(addTodo)} color="#640D5F" />
        </View>

        {/* List of todos */}
        <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
              padding: 10,
              borderRadius: 5,
              backgroundColor: "#f9f9f9",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 1,
            }}
          >
            <Checkbox value={selectedTodos.has(item.id)} onValueChange={() => toggleSelection(item.id)} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                  padding: 5,
                  flexWrap: "wrap", // Allow text to wrap
                  maxHeight: 100, // Maximum height to prevent the text from growing infinitely
                  textAlignVertical: "top", // Align text to the top in case it grows
                }}
                multiline={true} // Allow multiple lines
                value={item.text}
                onChangeText={(text) => updateTodo(item.id, text)}
              />
              <Text style={{ fontSize: 12, color: "#888" }}>{item.date}</Text>
            </View>
          </View>
        )}
      />



        {/* Buttons to delete selected todos and clear all todos */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
          {selectedTodos.size > 0 && (
            <Button title="Delete Selected" onPress={deleteSelected} color="#ff6347" />
          )}
          {todos.length > 0 && (
            <Button title="Clear All Todos" onPress={clearTodos} color="#ff6347" />
          )}
        </View>
      </View>
      
    </View>
  );
}
