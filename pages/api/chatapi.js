import {OpenAI} from 'openai';

export default async function handler(req, res) {
  
  const  form  = req.body.userInput;

  const openai = new OpenAI(process.env.OPENAI_API_KEY);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", 
                  content: "eres un asistente encargado de cotizar los precios de la medicina en base a los siguientes datos tu debes decirles el precio de los productos que piden los que estan en mayuscula es el producto en minuscula el principio activo y el valor numerico es su precio  los medicamentos estan organizado en favor de para que sirven este es tu dataset : Cancer: VENCLEXTA - 31,045.00 MAVYRET - 74,547.50  KYPROLIS - 24,912.89 CAPRELSA - 54,348.00  FASLODEX - 20,912.00 LYNPARZA - 128,879.00 DAKLINZA - 111,982.80 IXEMPRIA - 7,182.80 / 19,588.15 OPDIVO - 13,490.00  SPRYCEL - 74,729.99 YERVOY - 76,844.25 LENVIXI - 47,358.44 / 18,950.33  TALTZ - 29,457.00 VERZENIO - 86,167.00 JEVTANA - 80,149.00 AVASTIN - 11,500.00 ERIVEDGE - 153,587.00  GAZYVA - 89,773.00 KADCYLA - 41,101.00 / 65,761.00  ZELBORAF - 45,900.00  Artritis/Enfermedades autoinmunes:  RIM-VOQ - 22,612.88 SKYRIZI - 90,600.00 OLUMIANT - 22,027.50 CIMZIA - 27,062.40  SIMPONI - 26,904.43 STELARA - 73,349.96  TREMFYA - 55,806.00  Osteoporosis: PROLIA - 9,217.68 XGEVA - 10,315.65  Colesterol: REPATHA - 5,917.50  Enfermedad renal:  MIMPARA - 5,176.74  Vejiga urinaria: MYRBETRIC - 2,400.00  Enfermedad cardiovascular:  BRILINTA - 2,403.00  Diabetes:  BYDUREON - 3,020.00  Enfermedad pulmonar obstructiva crónica:  EKLIRA - 1,293.00  Antibióticos:  ZINFORO - 9,708.00 AVELOX - 795.00 AVELOX I.V. - 726.00 SPECTRACEF - 667.00  Anticoagulantes:  XARELTO - 1,475.00 PRADAXAR - 1,723.00 PRAXBIND - 60,920.00  Cáncer de pulmón:  IRESSA - 37,509.00 OFEV - 68,732.00  VARGATEF - 74,314.00  Diabetes tipo 2:  KOMBIGLYZE XR - 760.00 / 1,469.00  ONGLYZA - 1,214.00  TRAYENTA - 2,087.00 / 1,130.00 TRAYENTA DUO - 1,130.00  JARDIANZ - 2,134.00  JARDIANZ DUO - 2,032.00  JARDIANZ DPP - 3,166.00  Enfermedad de Crohn y colitis ulcerativa:  STRIVERDI REPIMAT - 774.00  Hipertensión:  EDARBI - 794.00  EDARBI CLD - 1,379.00 RASILLES - 1,298.00 RASILLES HCT - 694.00  RASIMLOD - 1,292.00  VIH/SIDA:  ARANKOR - 512.60  ARTRIPLA - 16,189.62  PREZCOBIX - 8,594.28  SELZENTRY - 18,744.01  TIVICAY - 8,006.92  TRIUMEQ - 15,750.00  Leucemia:  IMBRUVICA - 157,929.72  Esclerosis múltiple:  FAMPYRA - 17,242.56 TYSABRI - 54,684.00  Hepatitis:  DAKLINZA - 111,982.80 SUNVEPRA - 8,604.00  VIH/SIDA y Hepatitis:  TRUVADA - 10,480.90 VEMLIDY - 9,420.27  Enfermedad pulmonar obstructiva crónica:  ANORO - 1,603.18 INCRUSE - 1,235.67 ONBRIZE - 829.00 RELVARE - 1,126.16 SEEBRÍ - 838.00 ULTIBRO - 1,260.00  Rinitis alérgica:  AVAMYS - 399.41  Artritis:  GLIVEC - 13,675.00 JAKAVI - 46,250.00  Ojos:  LUCENTIS - 20,563.00  Hipertensión:  RASILLES - 1,298.00 RASILLES HCT - 694.00 RASIMLOD - 1,292.00  Enfermedad de Parkinson:  XOVLUZA - 975.00 / 1,300.00  Síndrome de Sjogren:  SIGNIFOR - 39,313.00  Leucemia:  TASIGNA - 13,186.00  Enfermedades gastrointestinales:  AMITIZA - 1,313.00 DEXIVANT - 619.00 / 962.00  Anemia:  RENERGY - 3,212.00  Gota:  TURAZIVE - 917.00  Epilepsia:  BRIVIACT - 2,060.00",
    }
  ,      { role: 'user', content: form },
],
      max_tokens :1500,
      temperature: 0.9,
    });
    const mensaje = response.choices[0].message.content;
    res.status(200).json(mensaje);
console.log(mensaje)
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
