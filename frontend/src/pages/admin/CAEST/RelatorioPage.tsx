import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { addDays, addYears, format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"
import { DateRange } from "react-day-picker"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  dataInicio: z.date({
    required_error: "Data de início é obrigatória"
  }),
  dataFim: z.date({
    required_error: "Data de fim é obrigatória"
  })
})


export const RelatorioPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  }
  return (
    <>
      <Header/>
      <main className="max-w-[56.25rem] mx-auto space-y-28">
        <h1 className="font-medium text-4xl mt-24">Relatórios</h1>
        <div className="w-full flex justify-between items-center">
          <Form {...form}>
            <form className="flex flex-col gap-10" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="dataInicio"
                render={({field}) => (
                  <FormItem className="flex flex-col">
                    <FormLabel htmlFor="dataInicio">Data de Início</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: ptBR })
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-a" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > addYears(new Date(), 1) || date < new Date("2019-01-01")
                          }
                          locale={ptBR}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Selecione a data de início do relatório
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dataFim"
                render={({field}) => (
                  <FormItem className="flex flex-col">
                    <FormLabel htmlFor="dataFim">Data de Fim</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: ptBR })
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-a" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > addYears(new Date(), 1) || date < new Date("2019-01-01")
                          }
                          locale={ptBR}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Selecione a data de fim do relatório
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <Button className="bg-green" type="submit">
                Gerar Relatório
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </>
  )
}
