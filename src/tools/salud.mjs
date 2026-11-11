import { calcForm } from './calc.mjs';

const L = (es, en) => ({ es, en });
const BTN = L('Calcular', 'Calculate');

export const imc = {
  id: 'bmi',
  slug: { es: 'calculadora-imc', en: 'bmi-calculator' },
  title: { es: 'Calculadora de IMC (índice de masa corporal) para adultos', en: 'BMI Calculator (Body Mass Index) for Adults' },
  description: {
    es: 'Calcula tu índice de masa corporal a partir del peso y la altura y consulta en qué categoría de la OMS se encuentra. Gratis.',
    en: 'Calculate your body mass index from weight and height and see which WHO category it falls into. Free.',
  },
  hint: L('peso y altura', 'weight and height'),
  form: (lang) => calcForm(lang, {
    lib: 'health', fn: 'bmi', button: BTN,
    fields: [
      { id: 'weight', label: L('Peso (kg)', 'Weight (kg)'), value: '70' },
      { id: 'height', label: L('Altura (cm)', 'Height (cm)'), value: '175' },
    ],
  }),
  content: {
    es: {
      h1: 'Calculadora de IMC',
      intro: [
        'El índice de masa corporal relaciona tu peso con tu altura mediante una fórmula sencilla: el peso en kilos dividido entre la altura en metros al cuadrado. La Organización Mundial de la Salud lo usa como una primera referencia para clasificar el peso en adultos: bajo peso, peso normal, sobrepeso u obesidad.',
        'Es una herramienta de cribado, no un diagnóstico. No distingue entre músculo y grasa, ni tiene en cuenta la edad, el sexo o dónde se acumula la grasa. Úsala como punto de partida y, si tienes dudas sobre tu peso, consulta con un profesional sanitario.',
      ],
      steps: [
        'Escribe tu peso actual en kilogramos.',
        'Escribe tu altura en centímetros, sin convertir a metros.',
        'Pulsa Calcular para obtener tu IMC con un decimal.',
        'Mira la categoría que aparece entre paréntesis: bajo peso por debajo de 18,5, normal hasta 24,9, sobrepeso hasta 29,9 y obesidad desde 30.',
        'Repite cuando cambie tu peso para seguir la evolución, siempre con la misma báscula.',
      ],
      example: 'Una persona de 70 kg y 175 cm tiene un IMC de 22,9, que entra en el peso normal. Con 90 kg y 170 cm el IMC es 31,1, que corresponde a obesidad según la clasificación de la OMS. Dos personas con el mismo IMC pueden tener composiciones corporales muy distintas.',
      faq: [
        ['¿Sirve para niños y adolescentes?', 'No. En menores de 18 años se interpreta con curvas de percentiles según edad y sexo, no con estos rangos.'],
        ['¿Por qué un deportista puede salir con sobrepeso?', 'Porque el músculo pesa más que la grasa y el IMC no los distingue. En esos casos importan más el perímetro de cintura y el porcentaje de grasa.'],
        ['¿Es lo mismo en todas las poblaciones?', 'No exactamente. Algunos organismos proponen umbrales más bajos para población asiática, por ejemplo.'],
        ['¿Sustituye a una consulta médica?', 'No. Es una referencia orientativa y no da consejo médico ni diagnóstico.'],
      ],
    },
    en: {
      h1: 'BMI calculator',
      intro: [
        'Body mass index relates your weight to your height with a simple formula: weight in kilograms divided by height in metres squared. The World Health Organization uses it as a first reference to classify adult weight as underweight, normal weight, overweight or obese.',
        'It is a screening tool, not a diagnosis. It does not tell muscle from fat, and it ignores age, sex and where fat is stored. Use it as a starting point and, if you have concerns about your weight, talk to a healthcare professional.',
      ],
      steps: [
        'Type your current weight in kilograms.',
        'Type your height in centimetres, without converting to metres.',
        'Press Calculate to get your BMI to one decimal place.',
        'Read the category in brackets: underweight below 18.5, normal up to 24.9, overweight up to 29.9 and obese from 30.',
        'Repeat when your weight changes to follow the trend, always using the same scale.',
      ],
      example: 'A person of 70 kg and 175 cm has a BMI of 22.9, which is normal weight. At 90 kg and 170 cm the BMI is 31.1, which falls in the obese range of the WHO classification. Two people with the same BMI can have very different body compositions.',
      faq: [
        ['Does it work for children and teenagers?', 'No. Under 18 it is read against percentile charts for age and sex, not these ranges.'],
        ['Why can an athlete show up as overweight?', 'Because muscle weighs more than fat and BMI cannot tell them apart. In those cases waist size and body fat percentage matter more.'],
        ['Is it the same for every population?', 'Not exactly. Some bodies propose lower thresholds for Asian populations, for example.'],
        ['Does it replace a medical appointment?', 'No. It is an indicative reference and gives no medical advice or diagnosis.'],
      ],
    },
  },
};

export const calorias = {
  id: 'calories',
  slug: { es: 'calorias-diarias', en: 'daily-calories' },
  title: { es: 'Calculadora de calorías diarias (metabolismo basal y gasto total)', en: 'Daily Calorie Calculator (BMR and Maintenance)' },
  description: {
    es: 'Estima tu metabolismo basal y las calorías que necesitas al día para mantener, bajar o subir de peso. Gratis.',
    en: 'Estimate your basal metabolic rate and the calories you need per day to maintain, lose or gain weight. Free.',
  },
  hint: L('kcal para mantener tu peso', 'kcal to maintain your weight'),
  form: (lang) => calcForm(lang, {
    lib: 'health', fn: 'calories', button: BTN,
    fields: [
      { id: 'sex', label: L('Sexo', 'Sex'), value: 'f', options: [['f', L('Mujer', 'Female')], ['m', L('Hombre', 'Male')]] },
      { id: 'age', label: L('Edad (años)', 'Age (years)'), value: '35' },
      { id: 'weight', label: L('Peso (kg)', 'Weight (kg)'), value: '65' },
      { id: 'height', label: L('Altura (cm)', 'Height (cm)'), value: '165' },
      { id: 'activity', label: L('Actividad', 'Activity level'), value: '1.375', options: [
        ['1.2', L('Sedentaria (poco o nada de ejercicio)', 'Sedentary (little or no exercise)')],
        ['1.375', L('Ligera (1 a 3 días por semana)', 'Light (1 to 3 days a week)')],
        ['1.55', L('Moderada (3 a 5 días por semana)', 'Moderate (3 to 5 days a week)')],
        ['1.725', L('Intensa (6 a 7 días por semana)', 'Intense (6 to 7 days a week)')],
      ] },
    ],
  }),
  content: {
    es: {
      h1: 'Calculadora de calorías diarias',
      intro: [
        'Tu cuerpo gasta energía incluso en reposo para mantener la respiración, la temperatura y el resto de funciones vitales. Eso es el metabolismo basal. Si lo multiplicas por un factor según tu nivel de actividad, obtienes una estimación de las calorías que gastas en un día normal, es decir, las que necesitas para mantener tu peso.',
        'La calculadora usa la ecuación de Mifflin-St Jeor, una de las más aceptadas para adultos sanos. Es una estimación: dos personas con los mismos datos pueden gastar cantidades distintas. Úsala como punto de partida y ajústala según cómo evolucione tu peso en varias semanas.',
      ],
      steps: [
        'Elige tu sexo y escribe tu edad en años cumplidos.',
        'Introduce tu peso en kilogramos y tu altura en centímetros.',
        'Elige el nivel de actividad que mejor describa tu semana típica, siendo honesto.',
        'Pulsa Calcular para ver el metabolismo basal y las calorías de mantenimiento.',
        'Usa las cifras de pérdida o ganancia como referencia y reajusta cada dos o tres semanas.',
      ],
      example: 'Una mujer de 35 años, 65 kg, 165 cm y actividad ligera tiene un metabolismo basal de unas 1.345 kcal y un mantenimiento de unas 1.850 kcal al día. Para perder alrededor de medio kilo por semana, la referencia baja a unas 1.350 kcal, y para subir de peso poco a poco, sube a unas 2.150 kcal.',
      faq: [
        ['¿Por qué la cifra para perder peso nunca baja de 1.200 kcal?', 'Porque por debajo de ese nivel es difícil cubrir las necesidades de nutrientes sin supervisión profesional.'],
        ['¿Es válida para embarazadas o personas con enfermedades?', 'No. En esos casos las necesidades son distintas y debe orientarlas un profesional sanitario.'],
        ['¿Cuán exacta es la estimación?', 'Tiene un margen de error de en torno al 10 %. Observa tu peso durante varias semanas para afinarla.'],
        ['¿Debo contar las calorías del ejercicio por separado?', 'No. El factor de actividad ya las incluye; contarlas dos veces llevaría a comer de más.'],
      ],
    },
    en: {
      h1: 'Daily calorie calculator',
      intro: [
        'Your body burns energy even at rest to keep breathing, stay warm and run its vital functions. That is your basal metabolic rate. Multiply it by a factor for your activity level and you get an estimate of the calories you burn on a normal day, which is what you need to maintain your weight.',
        'The calculator uses the Mifflin-St Jeor equation, one of the most widely accepted for healthy adults. It is an estimate: two people with the same data can burn different amounts. Use it as a starting point and adjust it based on how your weight moves over several weeks.',
      ],
      steps: [
        'Choose your sex and enter your age in completed years.',
        'Enter your weight in kilograms and your height in centimetres.',
        'Pick the activity level that best describes your typical week, and be honest.',
        'Press Calculate to see your basal rate and maintenance calories.',
        'Use the loss and gain figures as a reference and readjust every two or three weeks.',
      ],
      example: 'A 35-year-old woman, 65 kg, 165 cm with light activity has a basal rate of about 1,345 kcal and maintenance of about 1,850 kcal a day. To lose around half a kilo a week the reference drops to about 1,350 kcal, and to gain weight gradually it rises to about 2,150 kcal.',
      faq: [
        ['Why does the weight-loss figure never go below 1,200 kcal?', 'Because below that level it is hard to meet nutrient needs without professional supervision.'],
        ['Is it valid during pregnancy or with medical conditions?', 'No. Needs differ in those cases and should be guided by a healthcare professional.'],
        ['How accurate is the estimate?', 'It has a margin of error of around 10%. Track your weight over several weeks to fine-tune it.'],
        ['Should I count exercise calories separately?', 'No. The activity factor already includes them; counting them twice would lead you to overeat.'],
      ],
    },
  },
};

export const proteina = {
  id: 'protein',
  slug: { es: 'proteina-diaria', en: 'daily-protein' },
  title: { es: 'Calculadora de proteína diaria según tu peso y actividad', en: 'Daily Protein Calculator by Weight and Activity' },
  description: {
    es: 'Calcula cuántos gramos de proteína al día necesitas según tu peso y tu nivel de actividad física. Gratis y sin registro.',
    en: 'Work out how many grams of protein a day you need based on your weight and activity level. Free, no sign-up.',
  },
  hint: L('gramos al día', 'grams per day'),
  form: (lang) => calcForm(lang, {
    lib: 'health', fn: 'protein', button: BTN,
    fields: [
      { id: 'weight', label: L('Peso (kg)', 'Weight (kg)'), value: '70' },
      { id: 'factor', label: L('Objetivo', 'Goal'), value: '1.2', options: [
        ['0.8', L('Mínimo recomendado (0,8 g/kg)', 'Recommended minimum (0.8 g/kg)')],
        ['1.2', L('Persona activa (1,2 g/kg)', 'Active person (1.2 g/kg)')],
        ['1.6', L('Entrenamiento de fuerza (1,6 g/kg)', 'Strength training (1.6 g/kg)')],
      ] },
    ],
  }),
  content: {
    es: {
      h1: 'Calculadora de proteína diaria',
      intro: [
        'La proteína es el nutriente que el cuerpo usa para mantener y reparar músculos, piel, enzimas y defensas. Cuánta necesitas depende sobre todo de tu peso y de cuánto te muevas: una persona sedentaria necesita menos que alguien que entrena fuerza varias veces por semana.',
        'Esta calculadora multiplica tu peso por una cantidad de gramos por kilo según el objetivo que elijas y reparte el total en cuatro comidas, para que veas cuánto aporta cada una. Son valores orientativos para adultos sanos, no una pauta dietética personalizada.',
      ],
      steps: [
        'Escribe tu peso actual en kilogramos.',
        'Elige el objetivo: el mínimo recomendado, persona activa o entrenamiento de fuerza.',
        'Pulsa Calcular para ver los gramos de proteína al día.',
        'Mira el reparto por comida para planificar desayuno, comida, merienda y cena.',
        'Compara con lo que comes en un día normal y ajusta alimentos si te quedas corto.',
      ],
      example: 'Una persona de 70 kg necesita como mínimo unos 56 g de proteína al día con el factor de 0,8 g/kg. Si entrena fuerza, con 1,6 g/kg la cifra sube a 112 g, que repartidos en cuatro comidas son 28 g por comida, algo así como un filete pequeño más un yogur.',
      faq: [
        ['¿Más proteína es siempre mejor?', 'No. Pasado cierto punto el cuerpo no obtiene beneficio adicional, y las dietas muy altas en proteína no son adecuadas para todo el mundo.'],
        ['¿Qué alimentos aportan más proteína?', 'Carne, pescado, huevos y lácteos, y entre los vegetales las legumbres, el tofu, el tempeh y los frutos secos.'],
        ['¿Tengo que tomar suplementos?', 'Casi nunca. La mayoría de la gente cubre sus necesidades con alimentos normales.'],
        ['¿Y si tengo una enfermedad renal?', 'Consulta a tu médico antes de subir la proteína. Esta herramienta no sustituye una pauta profesional.'],
      ],
    },
    en: {
      h1: 'Daily protein calculator',
      intro: [
        'Protein is the nutrient your body uses to maintain and repair muscle, skin, enzymes and immune defences. How much you need depends mostly on your weight and how much you move: a sedentary person needs less than someone who lifts weights several times a week.',
        'This calculator multiplies your weight by an amount of grams per kilo for the goal you choose and splits the total across four meals so you can see what each one should provide. These are indicative values for healthy adults, not a personalised diet plan.',
      ],
      steps: [
        'Type your current weight in kilograms.',
        'Choose the goal: recommended minimum, active person or strength training.',
        'Press Calculate to see the grams of protein per day.',
        'Look at the per-meal split to plan breakfast, lunch, snack and dinner.',
        'Compare it with what you eat on a normal day and adjust foods if you fall short.',
      ],
      example: 'A 70 kg person needs at least about 56 g of protein a day at 0.8 g/kg. If they lift weights, at 1.6 g/kg the figure rises to 112 g, which split across four meals is 28 g per meal, roughly a small steak plus a yoghurt.',
      faq: [
        ['Is more protein always better?', 'No. Beyond a certain point the body gains no extra benefit, and very high-protein diets are not suitable for everyone.'],
        ['Which foods give the most protein?', 'Meat, fish, eggs and dairy, and among plant foods pulses, tofu, tempeh and nuts.'],
        ['Do I need supplements?', 'Almost never. Most people meet their needs with ordinary food.'],
        ['What if I have kidney disease?', 'Ask your doctor before raising protein. This tool does not replace professional advice.'],
      ],
    },
  },
};

export const saludTools = [imc, calorias, proteina];
