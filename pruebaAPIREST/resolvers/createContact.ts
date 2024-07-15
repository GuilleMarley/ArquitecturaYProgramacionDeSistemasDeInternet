import { ContactModel } from "../contact.ts";
import { Request, Response } from "express";
import { NINJA_KEY } from "../main.ts";

const createContact = async (req: Request, res: Response) => {
    try {
        // Parse and store the body content once
        const { dni, name, email, postal, Iso } = req.body;
        
        if (!dni || !name || !email || !postal || !Iso) {
            res.status(400).send("Faltan datos.");
            return;
        }

        const contactExist = await ContactModel.findOne({ dni }).exec();
        if (contactExist) {
            res.status(400).send("Contact already exists.");
            return;
        }

        const urlCiudad = "https://zip-api.eu/api/v1/info/"+Iso.toString()+"-"+postal.toString();
        const dataCiudad = await fetch(urlCiudad);
        if (!dataCiudad.ok) {
            res.status(500).send("Failed to fetch city data.");
            return;
        }
        const jsonCiudad = await dataCiudad.json();
        const place_name = jsonCiudad.place_name;

        const urlContinente = "https://restcountries.com/v3.1/alpha/"+Iso.toString();
        const dataContinente = await fetch(urlContinente);
        if (!dataContinente.ok) {
            res.status(500).send("Failed to fetch country data.");
            return;
        }
        const jsonContinente = await dataContinente.json();
        const pais = jsonContinente[0].name.common;
        const region = jsonContinente[0].region;

        const urlTimeZone = "https://api.api-ninjas.com/v1/timezone?city="+ place_name.toString();
        const responseTimeZone = await fetch(urlTimeZone, {
            headers: {
                'X-Api-Key': "cX6iJIULQKHNjfJdKGLFHw==Ygikb5prjtUsRRda"
            }
        });
        console.log(await responseTimeZone.json());
        
        if (!responseTimeZone.ok) {
            res.status(500).send("Failed to fetch timezone data.");
            return;
        }
        const jsonTimeZone = await responseTimeZone.json();
        const dataTimeZone = jsonTimeZone.timezone;

        const urlHora = `https://worldtimeapi.org/api/timezone/${region}/${place_name}`;
        const dataHoraApi = await fetch(urlHora);
        if (!dataHoraApi.ok) {
            res.status(500).send("Failed to fetch time data.");
            return;
        }
        const jsonHora = await dataHoraApi.json();
        const datetime = jsonHora.datetime;

        const urlTiempo = `http://api.weatherapi.com/v1/current.json?key=124b0ef364e24d9599090124230610&q=${place_name}&aqi=no`;
        const dataTiempo = await fetch(urlTiempo);
        if (!dataTiempo.ok) {
            res.status(500).send("Failed to fetch weather data.");
            return;
        }
        const jsonTiempo = await dataTiempo.json();
        const currentTime = jsonTiempo.location.localtime;

        const newContact = new ContactModel({ dni, name, email, postal, Iso, place_name, pais, datetime, currentTime });
        await newContact.save();

        res.status(200).send({
            dni: newContact.dni,
            name: newContact.name,
            email: newContact.email,
            postal: newContact.postal,
            Iso: newContact.iso,
            place_name: newContact.place_name,
            pais: newContact.pais,
            datetime: newContact.datetime,
            currentTime: newContact.currentTime,
            id: newContact.id.toString(),
        });
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
};

export default createContact;
