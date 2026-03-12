import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#032e15",
  },
  container: {
    backgroundColor: "#016630",
  },
  header: {
    flexDirection: "row",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#196b24",
  },
  headerText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#016630",
  },
  footerTitle: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  footerText: {
    textAlign: "center",
    padding: 16,
    color: "#37371F",
  },
  formCard: {
    backgroundColor: "#196b24",
    padding: 15,
    borderRadius: 12,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#4AA159",
    padding: 10,
    borderRadius: 10,
    alignItems: "right",
    margin: 5,
  },
  priorityButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: "#016630",
    borderRadius: 8,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 75,
    borderColor: "#073704",
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    overflow: "hidden",
    backgroundColor: "#e5e7eb",
  },
  priorityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  itemName: {
    color: "#000000",
    fontFamily: "ButterflyKids",
    fontSize: 24,
    padding: 5,
  },
  itemDesc: {
    fontSize: 14,
    color: "#000000",
    flexDirection: "column",
    padding: 5,
    alignItems: "stretch",
  },
  postContainer: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: "#4AA159",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;
