import { StyleSheet ,Dimensions} from "react-native";
import { COLORS } from "@/constants/theme";
const {width, height} = Dimensions.get("window")
 export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
      
  },
  brandSection: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.12,
  },
  logoContainer: {
    width:60,
    height: 60,
    borderRadius: 18,
    alignItems: "center",
    backgroundColor: "rgba(74, 222, 128, 0.15)",
    justifyContent: "center",
    marginBottom: 20,
  },
  appName: {
    fontSize: 43,
    fontWeight: "700",
    fontFamily: "JetBrainsMono-Medium",
    color: COLORS.primary,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "JetBrainsMono-Medium",
    color: "grey",
    textAlign: "center",
    paddingHorizontal: 20,
    textTransform :"lowercase",
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,

  },
  illustration: {
    width: width * 0.8,
    height: height * 0.8,
    maxHeight: 280,
  },
  loginSection: {
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 20,
    width: "100%",
    maxHeight:300,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  googleIconContainer: {
    width:24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgb(42, 43, 42)",
  },
  termText: {
    textAlign: "center",
    fontSize: 14,
    color: "rgba(204, 199, 199, 0.7)",
    maxHeight:280,
  },

});