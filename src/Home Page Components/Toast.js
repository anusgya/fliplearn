import { useToast } from "@chakra-ui/react"


export default function SuccessToast() {
    const toast = useToast()
    return (
          toast({
            title: 'one deck created.',
            // description: "We've created your account for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
    )
  }