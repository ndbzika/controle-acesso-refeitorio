import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import axios from "axios"

export const handleError = (error: any) => {

  if (axios.isAxiosError(error)) {
    var err = error.response;
    console.log(err);

    if (Array.isArray(err?.data.errors)) {
      toast({
        title: err.data.message,
        variant: 'destructive',
        action: (
          <ToastAction altText="Fechar">Fechar</ToastAction>
        )
      })
    } else if (typeof err?.data.errors === 'object') {
      for (let key in err?.data.errors) {
        toast({
          title: err.data.errors[key][0],
          variant: 'destructive',
          action: (
            <ToastAction altText="Fechar">Fechar</ToastAction>
          )
        })
      }
    } else if (err?.data) {
      toast({
        title: err.data,
        variant: 'destructive',
        action: (
            <ToastAction altText="Fechar">Fechar</ToastAction>
          )
      })
    } else if (err?.status === 401) {
      toast({
        title: 'Por favor, faça login',
        variant: 'destructive',
        action: (
            <ToastAction altText="Fechar">Fechar</ToastAction>
          )
      })
      window.history.pushState({}, 'Login Page', '/')
    } else if (err) {
      toast({
        title: err.data,
        variant: 'destructive',
        action: (
            <ToastAction altText="Fechar">Fechar</ToastAction>
          )
      })
    }
  }
}
