/* 
    Elaborado por Krishna (equipo 1 del CECyT 9 Juan de Dios Bátiz):
    — Carapia Aguilar, José Manuel (carapia.aguilar.jose.manuell@gmail.com);
    — Cruz Santos, Cristian Oziel (cruz.santos.cristianoziel@gmail.com);
    — Flores Quiroz, Daniela Grisel (flores.quiroz.daniela.grisel5@gmail.com);
    — Ibáñez Marmolejo, Miguel Gabriel (ibanez.marmolejo.miguel.gabriel@gmail.com);
    — Pérez Paz, Diego Azael (perez.paz.diego.azael@gmail.com).
    Document   : app
    Created on : 12/10/2021, 07:37:05 PM
    Author     : Miguel
 */

$(function () {
    $("#items").sortable({
        start: function (event, ui) {
            ui.item.toggleClass("highlight");
        },
        stop: function (event, ui) {
            ui.item.toggleClass("highlight");
        }
    });
    $("#items").disableSelection();
});