import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Shopping List",
          headerShown: false,
          headerStyle: { backgroundColor: "#016630" },
        }}
      />
    </Stack>
  );
}
