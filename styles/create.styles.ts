// styles/create.styles.ts
import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "@/constants/theme";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  
  },
  
    contentContainer: {
     flex: 1,
    },
    
 
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,

  },
  headerTitle: {
    marginLeft: 18,
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  emptyImageContainer: {

    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  emptyImageText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.grey,
  },
  
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageSection: {
    width: width,
    height: width,
    backgroundColor: COLORS.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  changeImageButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    gap: 6,
  },
  changeImageText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "500",
  },
  inputSection: {
    padding: 16,
    flex: 1,
  },
  captionContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  captionInput: {
    flex: 1,
    color: COLORS.white,
    fontSize: 16,
    paddingTop: 8,
    minHeight: 40,
  },
  shareButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  shareButtonDisabled: {
    opacity: 0.5,
  },
  shareText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  contentDisabled: {
    opacity: 0.7,
  },
});