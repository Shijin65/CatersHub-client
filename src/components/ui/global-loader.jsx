import { Portal } from "@mui/material"
import { MainLoader } from "./main-loader"

/**
 * Render a loader component based on the value of the `loading` prop.
 *
 * @param {Object} props - The props for the component.
 * @param {boolean} props.loading - A boolean indicating whether the component should be rendered in a loading state.
 * @return {React.ReactNode} The rendered loader component.
 */
export const GlobalLoader = ({ loading }) => {
    return loading ? (
        <Portal>
            <MainLoader  />
        </Portal>
    ) : null
}
