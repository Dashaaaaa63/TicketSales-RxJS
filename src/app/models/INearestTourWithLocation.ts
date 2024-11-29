import {ITourLocation} from "./ITourLocation";
import {INearestTour} from "./INearestTour";

export interface INearestTourWithLocation extends INearestTour {
  location: ITourLocation;
}
