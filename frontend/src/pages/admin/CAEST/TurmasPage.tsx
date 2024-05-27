import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from '@/components/ui/use-toast'
import axios from '@/config/axios'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'

const cadastrarTurma = async (data: any) => {
  const { curso, turma, ano, edital } = data;
  console.log(edital);

  return await axios.post('/editais', {
    edital: edital
  })
}

const formSchema = z.object({
    curso: z.string(),
    turma: z.string().min(1).max(4),
    ano: z.string(),
    edital: z.custom<File>().refine((file) => file instanceof File, {
      message: 'O arquivo deve ser um CSV',
    })
})

export const TurmasPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      curso: '',
      turma: '1',
      ano: '2020',
    }
  })
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    cadastrarTurma(values).then((res) => {
      toast({
        title: 'Turma cadastrada com sucesso'
      })
    }).catch((err) => {
      toast({
        title: 'Erro ao cadastrar turma',
        variant: "destructive"
      })
    })
  }
  return (
    <main className="w-full h-full mt-24">
      <section className="flex flex-col justify-center items-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col lg:flex-row justify-between items-center w-full max-w-full px-36 gap-12">
              <div className="w-80">
                <h1 className="font-bold text-4xl text-center mb-12">Cadastrar Turma</h1>
                <FormField
                control={form.control}
                name="curso"
                render={({ field}) => (
                  <FormItem className="mb-9">
                    <FormLabel>Curso</FormLabel>
                    <FormControl>
                      <Select required onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Curso" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="INTED">INTED</SelectItem>
                          <SelectItem value="INTEL">INTEL</SelectItem>
                          <SelectItem value="INTIN">INTIN</SelectItem>
                          <SelectItem value="MEIOAMBIENTE">MEIO AMBIENTE</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                <div className="flex gap-8 mb-12">
                  <FormField
                  control={form.control}
                  name="turma"
                  render={({ field}) => (
                    <FormItem>
                      <FormLabel>Turma</FormLabel>
                      <FormControl>
                        <Select required onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="w-36">
                            <SelectValue placeholder="Turma" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1°</SelectItem>
                            <SelectItem value="2">2°</SelectItem>
                            <SelectItem value="3">3°</SelectItem>
                            <SelectItem value="4">4°</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                  <FormField
                  control={form.control}
                  name="ano"
                  render={({ field}) => (
                    <FormItem>
                      <FormLabel>Ano</FormLabel>
                      <FormControl>
                        <Select required onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="w-36">
                            <SelectValue placeholder="Ano" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='2020'>2020</SelectItem>
                            <SelectItem value='2021'>2021</SelectItem>
                            <SelectItem value='2022'>2022</SelectItem>
                            <SelectItem value='2023'>2023</SelectItem>
                            <SelectItem value='2024'>2024</SelectItem>
                            <SelectItem value='2025'>2025</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                </div>
                <Button
                type="submit"
                className="w-full bg-green font-bold text-white text-xl"
                >
                  Cadastrar
                </Button>
              </div>
              <FormField
              control={form.control}
              name="edital"
              render={({ field: {value, onChange, ...fieldProps }}) => (
                <FormItem>
                  <FormLabel>Edital</FormLabel>
                  <FormControl>
                    <Input
                    {...fieldProps}
                    placeholder="Edital"
                    type="file"
                    accept=".csv"
                    onChange={(e) =>
                      onChange(e.target.files && e.target.files[0])
                    }
                    className="w-[31.25rem] h-[25rem]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
            </form>
          </Form>
      </section>
    </main>
  )
}
