import { useGetProfileQuery } from "src/entities/Profile/api/profileApi";
import { useSigninMutation, useSignupMutation } from "../api/authApi";
import { clearToken, getAccessToken, saveToken } from "src/shared/lib/localStorage";
import { COMMAND_ID } from "src/shared/configs/api";

const useAuth = () => {
  const [signin, { isLoading:isLoadingSignin, isError:isErrorSignin, error:errorSignin }] = useSigninMutation();
  const [signup, { isLoading:isLoadingSignup, isError:isErrorSignup, error:errorSignup }] = useSignupMutation();
  // const {
  //   data: profile,
  //   refetch,
  //   isUninitialized,
  // } = useGetProfileQuery(undefined, {
  //   skip: !getAccessToken(),
  // });

    const signIn = async (email:string,password:string)=>{
      const token=await signin({email,password});
      if(token.data){
        saveToken(token.data.token);
      }
    }

    const signUp = async (email:string,password:string) => {
      const token=await signup({email,password,commandId:COMMAND_ID});
      if(token.data){
        saveToken(token.data.token);
      }
    }

    const signOut = () => {
      clearToken();
    }

    return {
      signIn,
      signUp,
      signOut,
      isLoading: isLoadingSignin||isLoadingSignup,
      isError: isErrorSignin||isErrorSignup,
      error: [
        ...(isErrorSignin ? (errorSignin as string[]) : []),
        ...(isErrorSignup ? (errorSignup as string[]) : []),
      ]
    };
}

export default useAuth;