import { calcForm } from './calc.mjs';

const money = (es, en) => ({ es, en });
const BTN = money('Calcular', 'Calculate');

export const interesCompuesto = {
  id: 'compound-interest',
  slug: { es: 'interes-compuesto', en: 'compound-interest' },
  title: { es: 'Calculadora de interés compuesto con aportes mensuales', en: 'Compound Interest Calculator with Monthly Contributions' },
  description: {
    es: 'Calcula cuánto crecerá tu dinero con interés compuesto, aportes mensuales y el plazo que elijas. Gratis y sin registro.',
    en: 'Find out how much your money will grow with compound interest, monthly contributions and the term you choose. Free.',
  },
  hint: money('saldo, aportes e intereses', 'balance, deposits and interest'),
  form: (lang) => calcForm(lang, {
    lib: 'finance', fn: 'compoundInterest', button: BTN,
    fields: [
      { id: 'principal', label: money('Dinero inicial', 'Starting amount'), value: '1000' },
      { id: 'monthly', label: money('Aporte mensual', 'Monthly contribution'), value: '100' },
      { id: 'rate', label: money('Interés anual (%)', 'Annual interest rate (%)'), value: '8' },
      { id: 'years', label: money('Años', 'Years'), value: '10' },
    ],
  }),
  content: {
    es: {
      h1: 'Calculadora de interés compuesto',
      intro: [
        'El interés compuesto es el que se calcula sobre el dinero inicial y también sobre los intereses que ya has ganado. Por eso el crecimiento no es una línea recta: al principio parece lento y con los años se acelera. Esta calculadora te muestra cuánto tendrías al final del plazo si partes de una cantidad inicial y añades un aporte fijo cada mes.',
        'Sirve para comparar un depósito, un fondo o una cuenta de ahorro, para ver el efecto de empezar antes y para fijarte una meta realista. Los cálculos suponen una tasa constante y capitalización mensual, así que son una referencia y no una promesa de rentabilidad.',
      ],
      steps: [
        'Escribe el dinero con el que empiezas. Si partes de cero, pon 0.',
        'Indica cuánto vas a aportar cada mes. Puede ser 0 si solo quieres ver crecer un capital.',
        'Introduce el interés anual que esperas. Usa un valor prudente y no el mejor escenario.',
        'Elige el número de años. Los plazos largos son donde el interés compuesto marca la diferencia.',
        'Pulsa Calcular y compara el saldo final con el total que has aportado: la diferencia son los intereses.',
      ],
      example: 'Con 1.000 de partida, 100 al mes, un 8 % anual y 10 años, aportas en total 13.000. El saldo final ronda los 20.500, de modo que unos 7.500 son intereses. Si empiezas con los mismos datos pero durante 20 años, aportas 25.000 y el saldo ronda los 63.800: el tiempo pesa más que el esfuerzo mensual.',
      faq: [
        ['¿Cuál es la diferencia entre interés simple y compuesto?', 'El simple se calcula siempre sobre el capital inicial. El compuesto se calcula también sobre los intereses acumulados, por eso crece más rápido con el tiempo.'],
        ['¿Los aportes se suman al principio o al final del mes?', 'La calculadora los suma al final de cada mes. Si aportas al principio, el resultado real será algo mayor.'],
        ['¿Incluye comisiones, inflación o impuestos?', 'No. Son factores que reducen la rentabilidad real, así que conviene restarlos de la tasa que introduzcas.'],
        ['¿Puedo usar una tasa del 0 %?', 'Sí. Entonces el resultado es solo la suma del dinero inicial y de todos los aportes.'],
      ],
    },
    en: {
      h1: 'Compound interest calculator',
      intro: [
        'Compound interest is calculated on your starting money and also on the interest you have already earned. That is why growth is not a straight line: it looks slow at first and speeds up over the years. This calculator shows how much you would have at the end of the term if you start with a lump sum and add a fixed contribution every month.',
        'Use it to compare a deposit, a fund or a savings account, to see the effect of starting early and to set a realistic goal. The maths assumes a constant rate and monthly compounding, so treat the output as a reference and not as a promise of returns.',
      ],
      steps: [
        'Type the money you start with. If you begin from zero, enter 0.',
        'Enter how much you will add each month. It can be 0 if you only want to see a lump sum grow.',
        'Enter the annual interest rate you expect. Use a cautious value, not the best-case scenario.',
        'Choose the number of years. Long terms are where compounding makes the difference.',
        'Press Calculate and compare the final balance with the total you paid in: the gap is the interest.',
      ],
      example: 'With 1,000 to start, 100 a month, 8% a year and 10 years, you pay in 13,000 in total. The final balance is around 20,500, so about 7,500 is interest. Keep the same inputs for 20 years and you pay in 25,000 while the balance reaches about 63,800: time matters more than the monthly effort.',
      faq: [
        ['What is the difference between simple and compound interest?', 'Simple interest is always calculated on the original amount. Compound interest is also calculated on accumulated interest, so it grows faster over time.'],
        ['Are contributions added at the start or the end of the month?', 'The calculator adds them at the end of each month. If you contribute at the start, the real result will be slightly higher.'],
        ['Does it include fees, inflation or taxes?', 'No. They all lower the real return, so it is wise to subtract them from the rate you enter.'],
        ['Can I use a 0% rate?', 'Yes. The result is then just your starting money plus all the contributions.'],
      ],
    },
  },
};

export const cuotaPrestamo = {
  id: 'loan-payment',
  slug: { es: 'cuota-prestamo', en: 'loan-payment' },
  title: { es: 'Calculadora de cuota de préstamo e intereses totales', en: 'Loan Payment and Total Interest Calculator' },
  description: {
    es: 'Calcula la cuota mensual de un préstamo, el total a pagar y los intereses según el importe, la tasa y el plazo. Gratis.',
    en: 'Work out the monthly payment of a loan, the total cost and the interest from the amount, rate and term. Free.',
  },
  hint: money('cuota mensual e intereses', 'monthly payment and interest'),
  form: (lang) => calcForm(lang, {
    lib: 'finance', fn: 'loanPayment', button: BTN,
    fields: [
      { id: 'amount', label: money('Importe del préstamo', 'Loan amount'), value: '10000' },
      { id: 'rate', label: money('Interés anual (%)', 'Annual interest rate (%)'), value: '12' },
      { id: 'years', label: money('Plazo en años', 'Term in years'), value: '5' },
    ],
  }),
  content: {
    es: {
      h1: 'Calculadora de cuota de préstamo',
      intro: [
        'Antes de firmar un préstamo conviene saber cuánto pagarás cada mes y, sobre todo, cuánto pagarás de más en total. Esta calculadora usa el sistema de amortización francés, el más habitual en préstamos personales, de coche e hipotecas: la cuota mensual es siempre la misma y al principio la mayor parte se va en intereses.',
        'Puedes probar distintos plazos y tipos de interés para ver el equilibrio entre una cuota cómoda y un coste total razonable. Alargar el plazo baja la cuota, pero casi siempre sube mucho los intereses que terminas pagando.',
      ],
      steps: [
        'Escribe el importe que necesitas pedir prestado.',
        'Introduce el tipo de interés anual nominal que te ofrece el banco.',
        'Indica el plazo en años. Para meses, usa decimales: 1,5 son 18 meses.',
        'Pulsa Calcular para ver la cuota mensual, el total devuelto y los intereses.',
        'Repite con otro plazo y compara cuánto cambia el coste total.',
      ],
      example: 'Un préstamo de 10.000 al 12 % anual a 5 años tiene una cuota de unos 222,44 al mes. En total devuelves cerca de 13.346, es decir, unos 3.346 de intereses. A 2 años la cuota sube a 470,73, pero los intereses bajan a unos 1.298.',
      faq: [
        ['¿Qué incluye la cuota calculada?', 'Solo capital e intereses. No incluye comisiones de apertura, seguros vinculados ni gastos de gestión, que encarecen el préstamo.'],
        ['¿Es lo mismo la TIN que la TAE?', 'No. La TIN es el interés nominal. La TAE incluye además comisiones y la periodicidad, y sirve para comparar ofertas. Aquí debes usar la TIN.'],
        ['¿Qué pasa si adelanto pagos?', 'Reduces el capital pendiente y, por tanto, los intereses futuros. Esta calculadora no modela amortizaciones anticipadas.'],
        ['¿Sirve para una hipoteca?', 'Sí para una hipoteca a tipo fijo. Para tipo variable, la cuota cambiará cuando cambie el índice de referencia.'],
      ],
    },
    en: {
      h1: 'Loan payment calculator',
      intro: [
        'Before signing a loan you should know what you will pay each month and, above all, how much extra you will pay in total. This calculator uses the standard amortising formula, common for personal loans, car loans and mortgages: the monthly payment is always the same and at the start most of it goes to interest.',
        'You can try different terms and interest rates to see the balance between a comfortable payment and a reasonable total cost. A longer term lowers the payment but almost always raises the interest you end up paying by a lot.',
      ],
      steps: [
        'Type the amount you need to borrow.',
        'Enter the nominal annual interest rate the lender offers you.',
        'Enter the term in years. For months, use decimals: 1.5 is 18 months.',
        'Press Calculate to see the monthly payment, the total repaid and the interest.',
        'Repeat with another term and compare how much the total cost changes.',
      ],
      example: 'A 10,000 loan at 12% a year over 5 years has a payment of about 222.44 a month. In total you repay close to 13,346, which is about 3,346 in interest. Over 2 years the payment rises to 470.73, but the interest drops to about 1,298.',
      faq: [
        ['What does the calculated payment include?', 'Only principal and interest. It leaves out arrangement fees, bundled insurance and admin costs, which make the loan more expensive.'],
        ['Is the nominal rate the same as the APR?', 'No. The nominal rate is the plain interest. The APR also includes fees and compounding, and is used to compare offers. Enter the nominal rate here.'],
        ['What happens if I pay early?', 'You reduce the outstanding principal and therefore future interest. This calculator does not model early repayments.'],
        ['Does it work for a mortgage?', 'Yes for a fixed-rate mortgage. With a variable rate, the payment will change when the reference index changes.'],
      ],
    },
  },
};

export const metaAhorro = {
  id: 'savings-goal',
  slug: { es: 'meta-de-ahorro', en: 'savings-goal' },
  title: { es: 'Calculadora de meta de ahorro: cuánto ahorrar al mes', en: 'Savings Goal Calculator: How Much to Save Monthly' },
  description: {
    es: 'Descubre cuánto debes ahorrar cada mes para alcanzar una meta en el plazo que elijas, con o sin interés. Gratis.',
    en: 'Find out how much to save each month to reach a goal in the time you choose, with or without interest. Free.',
  },
  hint: money('aporte mensual necesario', 'monthly deposit needed'),
  form: (lang) => calcForm(lang, {
    lib: 'finance', fn: 'savingsGoal', button: BTN,
    fields: [
      { id: 'goal', label: money('Meta de ahorro', 'Savings goal'), value: '12000' },
      { id: 'current', label: money('Ya tienes ahorrado', 'Already saved'), value: '0' },
      { id: 'rate', label: money('Interés anual (%)', 'Annual interest rate (%)'), value: '3' },
      { id: 'years', label: money('Años para lograrlo', 'Years to reach it'), value: '2' },
    ],
  }),
  content: {
    es: {
      h1: 'Calculadora de meta de ahorro',
      intro: [
        'Tener una meta con fecha, como un viaje, la entrada de una vivienda o un fondo de emergencia, cambia la forma de ahorrar. Esta calculadora hace la cuenta al revés: tú dices cuánto quieres reunir y en cuánto tiempo, y ella te dice cuánto tienes que apartar cada mes.',
        'Si tu dinero va a una cuenta que da intereses, el aporte necesario baja, porque los intereses hacen parte del trabajo. Si prefieres no depender de ellos, pon el interés en 0 y obtendrás el aporte mínimo seguro.',
      ],
      steps: [
        'Escribe la cantidad total que quieres alcanzar.',
        'Indica cuánto tienes ya ahorrado para esa meta. Si no tienes nada, pon 0.',
        'Introduce el interés anual de la cuenta donde guardarás el dinero, o 0 si no genera nada.',
        'Elige en cuántos años quieres lograrlo.',
        'Pulsa Calcular y compara el aporte con lo que realmente puedes permitirte cada mes.',
      ],
      example: 'Para reunir 12.000 en 2 años partiendo de cero y sin interés, necesitas ahorrar 500 al mes. Con una cuenta al 3 % anual, el aporte baja a unos 486. Si ya tienes 2.000 guardados, la cifra baja a unos 400 al mes aproximadamente.',
      faq: [
        ['¿Qué hago si el aporte me sale demasiado alto?', 'Tienes dos palancas: alargar el plazo o rebajar la meta. Prueba con un año más y mira cuánto cambia el esfuerzo mensual.'],
        ['¿Por qué sale 0 en el aporte?', 'Porque lo que ya tienes ahorrado, con sus intereses, alcanza la meta en el plazo elegido sin añadir nada más.'],
        ['¿Debo contar la inflación?', 'Si la meta es dentro de muchos años, sí: el dinero comprará menos. Súbela un poco para compensarlo.'],
        ['¿Los intereses son seguros?', 'Solo en productos de tipo fijo y garantizado. Para inversiones variables, usa un interés prudente o cero.'],
      ],
    },
    en: {
      h1: 'Savings goal calculator',
      intro: [
        'Having a goal with a date, such as a trip, a house deposit or an emergency fund, changes how you save. This calculator works backwards: you say how much you want to collect and how soon, and it tells you how much to set aside each month.',
        'If your money sits in an account that pays interest, the required deposit drops because interest does part of the work. If you prefer not to rely on it, set the rate to 0 and you get the safe minimum deposit.',
      ],
      steps: [
        'Type the total amount you want to reach.',
        'Enter how much you have already saved for it. If nothing, enter 0.',
        'Enter the annual interest of the account where you will keep the money, or 0 if it pays nothing.',
        'Choose in how many years you want to reach it.',
        'Press Calculate and compare the deposit with what you can really afford each month.',
      ],
      example: 'To collect 12,000 in 2 years starting from zero with no interest, you need to save 500 a month. With an account at 3% a year the deposit falls to about 486. If you already have 2,000 saved, it drops to roughly 400 a month.',
      faq: [
        ['What if the deposit comes out too high?', 'You have two levers: stretch the term or lower the goal. Try one more year and see how much the monthly effort changes.'],
        ['Why does the deposit show 0?', 'Because what you already have, with its interest, reaches the goal within the chosen term without adding anything.'],
        ['Should I account for inflation?', 'If the goal is many years away, yes: money will buy less. Raise the goal a little to compensate.'],
        ['Is the interest guaranteed?', 'Only on fixed, guaranteed products. For variable investments use a cautious rate or zero.'],
      ],
    },
  },
};

export const finanzasTools = [interesCompuesto, cuotaPrestamo, metaAhorro];
