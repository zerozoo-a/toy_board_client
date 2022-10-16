import { ChangeEvent } from "react" 

const handleOnChangeMultipleInputs: HandleOnChange = (e,setter, data) => {
        const {target:{name,value}} = e
        // setUser({...user,[name]:value})
        setter({...data,[name]:value})
    }

type HandleOnChange = <T>(
        e:ChangeEvent<HTMLInputElement>,
        setter: (a:T) => void,
        data: T
        ) => void


export {handleOnChangeMultipleInputs}