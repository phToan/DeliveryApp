import React, { useState } from 'react'
import { View, SafeAreaView, StyleSheet, Text } from 'react-native'
import SysModal from '../../../../Components/Modal/SysModal'
import { Header } from '../../../../Components/Header'
import { PasswordField } from '../../../../Components/TextInputField/passwordField'
import { ButtonConfirm } from '../../../../Components/ButtonConfirm'
import { validateConfirmPassword, validatePassword } from '../../../../Helper/validate'
import { updatePassword } from '../../../../Api/api_query'
import { styles } from './styles'

const EditPassword = ({ route, navigation }) => {
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [passwordOld, setPasswordOld] = useState('')
    const [hideOldPass, setHideOldPass] = useState(true)
    const [hideNewPass, setHideNewPass] = useState(true)
    const [hideRePass, setHideRePass] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const onClickEye1 = () => {
        setHideOldPass(!hideOldPass)
    }
    const onClickEye2 = () => {
        setHideNewPass(!hideNewPass)
    }
    const onClickEye3 = () => {
        setHideRePass(!hideRePass)
    }

    const onClickReturn = () => {
        navigation.goBack()
    }
    const onClickUpdate = () => {
        const data = {
            id: route.params.id,
            password: passwordOld,
            newPassword: password
        }
        if (passwordOld === password) {
            setErrorMessage('Vui lòng tạo 1 mật khẩu mới trước khi cập nhật')
            setShowModal(true)
        } else {
            updateData(data)
        }
        setHideNewPass(true)
        setHideOldPass(true)
        setHideRePass(true)
    }

    const updateData = async (data) => {
        const status = await updatePassword(data)
        if (status == 0) {
            setErrorMessage('Cập nhật mật khẩu thành công')
            setShowModal(true)
            setIsSuccess(true)
        } if (status == 2) {
            setErrorMessage('Mật khẩu cũ chưa chính xác. Vui lòng nhập lại!')
            setShowModal(true)
        } else {
            setErrorMessage('Cập nhật mật khẩu thất bại!')
            setShowModal(true)
        }
    }

    const onHideModal = () => {
        if (isSuccess) {
            setShowModal(false)
            navigation.goBack()
            setIsSuccess(false)
        } else {
            setShowModal(false)
        }
    }

    const validate =
        validatePassword(password) == null
        && validatePassword(passwordOld) == null
        && validateConfirmPassword(password, rePassword) == null
        && rePassword.length > 0 && password.length > 0
        && passwordOld.length > 0

    const handleText = (text) => {
        setPasswordOld(text)
    }

    const handleNewPass = (text) => {
        setPassword(text)
    }

    const handleRePass = (text) => {
        setRePassword(text)
    }

    return (
        <SafeAreaView style={styles.component}>
            <SysModal onHide={onHideModal} Visible={showModal} Message={errorMessage} />
            <Header onClickReturn={onClickReturn} title='Đổi mật khẩu' />
            <View style={styles.body}>
                <PasswordField
                    onChangeText={handleText}
                    label={'Mật khẩu hiện tại'}
                    password={passwordOld}
                    hide={hideOldPass}
                    onClickEye={onClickEye1}
                    validate={validatePassword(passwordOld) == null}
                />
                {validatePassword(passwordOld) != null &&
                    <Text style={styles.errText}>{validatePassword(passwordOld)}</Text>
                }
                <PasswordField
                    hide={hideNewPass}
                    label={'Mật khẩu mới'}
                    onChangeText={handleNewPass}
                    onClickEye={onClickEye2}
                    password={password}
                    validate={validatePassword(password) == null} />
                {validatePassword(password) != null &&
                    <Text style={styles.errText}>{validatePassword(password)}</Text>
                }
                <PasswordField
                    hide={hideRePass}
                    label={'Xác nhận mật khẩu mới'}
                    onChangeText={handleRePass}
                    onClickEye={onClickEye3}
                    password={rePassword}
                    validate={validateConfirmPassword(password, rePassword) == null} />
                {validateConfirmPassword(password, rePassword) &&
                    <Text style={styles.errText}>{validateConfirmPassword(password, rePassword)}</Text>
                }
            </View>
            <ButtonConfirm
                footerStyle={styles.footer}
                onPress={onClickUpdate}
                title={'Cập nhật'}
                validate={validate} />
        </SafeAreaView>
    )
}

export default EditPassword

