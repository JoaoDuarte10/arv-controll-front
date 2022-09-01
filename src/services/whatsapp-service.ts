export const WhatsAppService = {
  redirectToWhatsappWithMessage(
    event: Event,
    client: string,
    contact: string,
    date: string,
    time: string,
    qtdTotalAtendimento: number,
    qtdAtendimento: number,
    procedure: string,
  ) {
    event.preventDefault();
    const isPacote = qtdTotalAtendimento
      ? `Esse é o ${qtdAtendimento + 1}º dia do pacote. \n`
      : '';
    const dateUrl = new Date(date).toLocaleDateString('pt-BR', {
      timeZone: 'UTC',
    });
    const text = `Olá ${client}, posso confirmar o horário que agendamos para dia ${dateUrl} às ${time} horas? \n${isPacote}\nProcedimento: ${procedure} \nAguardo seu retorno!`;
    const URL = `https://api.whatsapp.com/send?phone=55${contact}&text=`;
    const redirect = window.encodeURIComponent(text);
    window.open(URL + redirect, '_blank');
  },

  redirectToWhatsapp(event: Event, contact: string) {
    event.preventDefault();
    const URL = `https://api.whatsapp.com/send?phone=55${contact.replace(
      /[^0-9]+/g,
      '',
    )}`;
    window.open(URL, '_blank');
  },
};
