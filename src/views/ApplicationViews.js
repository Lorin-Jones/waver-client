import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { GearDetails } from "../components/gear/GearDetails"
import { GearEdit } from "../components/gear/GearEdit"
import { GearForm } from "../components/gear/GearForm"
import { GearList } from "../components/gear/GearList"
import { UserList } from "../components/users/UserList"
import { UsedGearList } from "../components/used/UsedList"
import { Authorized } from "./Authorized"
import { UsedGearDetails } from "../components/used/usedGearDetails"
import { UsedGearForm } from "../components/used/UsedGearForm"
import { PostList } from "../components/posts/Posts"
import { PostDetails } from "../components/posts/PostDetails"
import { PostForm } from "../components/posts/PostForm"
import { UserPage } from "../components/users/UserPage"


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
                <Route path="/used_gear" element={<UsedGearList />} />
                <Route path="/used_gear/:usedId" element={<UsedGearDetails />} />
                <Route path="/used_gear/new" element={<UsedGearForm />} />
                <Route path="/posts" element={<PostList />} />
                <Route path="/posts/:postId" element={<PostDetails />} />
                <Route path="/posts/new" element={<PostForm />} />
                <Route path="/users/:userId" element={<UserPage />} />









                {/* Add Routes here */}
            </Route>
        </Routes>
    </>
}
