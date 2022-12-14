import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { GearDetails } from "../components/gear/GearDetails"
import { GearEdit } from "../components/gear/GearEdit"
import { GearForm } from "../components/gear/GearForm"
import { GearList } from "../components/gear/GearList"
import { UserList } from "../components/users/UserList"
import { Authorized } from "./Authorized"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/gear" element={<GearList />} />
                <Route path="/gear/:gearId" element={ <GearDetails />} />
                <Route path="/gear/new" element={<GearForm />} />
                <Route path="/gearUpdate/:gearId" element={<GearEdit />} />
                <Route path="/users" element={<UserList />} />





                {/* Add Routes here */}
            </Route>
        </Routes>
    </>
}
