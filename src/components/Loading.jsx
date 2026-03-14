import { ThreeDots } from 'react-loader-spinner'

const Loading = ({ height, width }) => {
  return (
    <>
      <ThreeDots
        visible={true}
        height={height}
        width={width}
        color="rgb(251, 155, 131)"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </>
  )
}

export default Loading
