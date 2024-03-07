import { View, Text, ScrollView, SafeAreaView, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Formik, validateYupSchema } from 'formik'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .max(16, 'More than 16 charecters not allowed')
    .min(4, 'Should me atleast 4 charecters')
    .required('length is required')
})

export default function App() {
  const [password, setpassword] = useState('')
  const [isPassGenerated, setisPassGenerated] = useState(false)
  const [hasNumber, sethasNumber] = useState(false)
  const [hasLowercase, sethasLowercase] = useState(true)
  const [hasUpperCase, sethasUpperCase] = useState(false)
  const [hasSymbol, sethasSymbol] = useState(false)

  const generatePassword = (passwordLength: number) => {
    let charecterList = ''
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '1234567890'
    const specialChar = '~!@#$%^&*(){}[]/|<>,.;:"+_-='

    if (hasNumber) {
      charecterList += numbers
    }
    if (hasLowercase) {
      charecterList += lowerCase
    }
    if (hasUpperCase) {
      charecterList += upperCase
    }
    if (hasSymbol) {
      charecterList += specialChar
    }

    const passwordresult = createPassword(passwordLength, charecterList)

    setpassword(passwordresult)
    setisPassGenerated(true)
  }

  const createPassword = (passwordLength: number, charecter: string) => {
    let result = ''
    for (let index = 0; index < passwordLength; index++) {
      const charecterIndex = Math.round(Math.random() * charecter.length)
      result += charecter.charAt(charecterIndex)
    }
    return result
  }

  const resetPassword = () => {
    sethasLowercase(true)
    sethasUpperCase(false)
    sethasSymbol(false)
    sethasNumber(false)
    setisPassGenerated(false)
    setpassword('')
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <SafeAreaView>
        <View style={{
          flex: 1,
          alignContent: 'center',
          padding: 10,
          justifyContent: 'center',
          alignSelf: 'stretch'
        }}>
          <Text style={{
            fontSize: 24,
            alignContent: 'center',
            color: '#ffffff',
          }}>Password Generator</Text>
        </View>
        <View>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              generatePassword(Number(values.passwordLength))
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View  >
                  <View style={{
                    flexDirection: 'row',
                    padding: 6,
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                    <Text style={{
                      fontSize: 18,
                      fontWeight: '600',
                      marginBottom: 2,
                      color: '#ffffff',
                    }}>Password Length :</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={
                        {
                          fontSize: 12,
                          color: '#ff0d10',
                        }
                      }>{errors.passwordLength}</Text>
                    )}
                    <TextInput
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder='Ex. 8'
                      keyboardType='numeric'
                      style={{
                        padding: 15,
                        width: '40%',
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: '#16213e',
                      }}
                    >
                    </TextInput>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    padding: 8,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                    <Text style={{
                      fontSize: 18,
                      fontWeight: '600',
                      marginBottom: 2,
                      color: '#ffffff',
                    }}>Include Lowercase</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={hasLowercase}
                      onPress={() => sethasLowercase(!hasLowercase)}
                      fillColor='#3503fc'
                      style={{
                        padding: 16,
                      }}
                    ></BouncyCheckbox>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    padding: 8,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                    <Text style={{
                      fontSize: 18,
                      fontWeight: '600',
                      marginBottom: 2,
                      color: '#ffffff',
                    }}>Include UpperCase</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={hasUpperCase}
                      onPress={() => sethasUpperCase(!hasUpperCase)}
                      fillColor='#3503fc'
                      style={{
                        padding: 16,
                      }}
                    ></BouncyCheckbox>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    padding: 8,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                    <Text style={{
                      fontSize: 18,
                      fontWeight: '600',
                      marginBottom: 2,
                      color: '#ffffff',
                    }}>Include Numbers</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={hasNumber}
                      onPress={() => sethasNumber(!hasNumber)}
                      fillColor='#3503fc'
                      style={{
                        padding: 16,
                      }}
                    ></BouncyCheckbox>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    padding: 8,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                    <Text style={{
                      fontSize: 18,
                      fontWeight: '600',
                      marginBottom: 2,
                      color: '#ffffff',
                    }}>Include Symbols</Text>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={hasSymbol}
                      onPress={() => sethasSymbol(!hasSymbol)}
                      fillColor='#3503fc'
                      style={{
                        padding: 16,
                      }}
                    ></BouncyCheckbox>
                  </View>
                </View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 20,
                }}>
                  <TouchableOpacity
                    onPress={() => {
                      handleReset()
                      resetPassword()
                    }}
                    style={{
                      width: 120,
                      padding: 10,
                      borderRadius: 8,
                      marginHorizontal: 8,
                      backgroundColor: '#5DA3FA',
                    }}
                  >
                    <Text>Reset</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={!isValid}
                    onPress={() => handleSubmit()}
                    style={{
                      width: 120,
                      padding: 10,
                      borderRadius: 8,
                      marginHorizontal: 8,
                      backgroundColor: '#5DA3FA',
                    }}
                  >
                    <Text>Generate</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPassGenerated ? (
          <View style={{
            backgroundColor: '#ffffff',
            elevation: 1,
            shadowOffset: {
              width: 1,
              height: 1,
            },
            shadowColor: '#333',
            shadowOpacity: 0.2,
            shadowRadius: 2,
            padding: 20,
            borderRadius: 6,
            marginHorizontal: 12,
          }}>
            <Text style={{
              fontSize: 22,
              textAlign: 'center',
              marginBottom: 12,
              color: '#000'
            }}
            selectable={true}>{password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  )
}
