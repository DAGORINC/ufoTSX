import { Component } from "react";

export interface IRoute {
    'name': string,
    'url': string,
    'component': Component,
    'hasStandardLayout': boolean,
}