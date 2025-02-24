import * as path from 'path';
import { EVENTS } from '../../../constants/constants';

// Default directories containing stimuli
const rootFolder = __dirname; // Note: there's a weird issue where the fs readdir function reads from BrainWaves dir

const facesDir = path.join(rootFolder, 'assets', 'face_house', 'faces');
const housesDir = path.join(rootFolder, 'assets', 'face_house', 'houses');
const fixation = path.join(rootFolder, 'assets', 'common', 'fixationcross.png');

export const buildN170Timeline = () => ({
  overview: `Faces contain a lot of information that is relevant to our
  survival. It's important to be able to quickly recognize people you can
  trust and read emotions in both strangers and people you know`,
  background_title: `The N170 ERP`,
  background: `The N170 is a large negative event-related potential (ERP)
  component that occurs after the detection of faces, but not
  objects, scrambled faces, or other body parts such as hands. The
  N170 occurs around 170ms after face perception and is most
  easily detected at lateral posterior electrodes such as T5 and
  T6. Frontal or profile views of human (and animal) faces elicit
  the strongest N170 and the strength of the N170 does not seem to
  be influenced by how familiar a face is. Thus, although there is
  no consensus on the specific source of the N170, researchers
  believe it is related to activity in the fusiform face area, an
  area of the brain that shows a similar response pattern and is
  involved in encoding the holistic representation of a face (i.e
  eyes, nose mouth all arranged in the appropriate way).`,
  protocol: `Subjects will view a series of images of faces and houses for 120 seconds.
    Subjects will mentally note which stimulus they are perceiving.`,
  params: {
    trialDuration: 1000,
    nbTrials: 150,
    iti: 500,
    jitter: 200,
    sampleType: 'with-replacement',
    pluginName: 'callback-image-display',
    intro:
      'You will view a series of faces and houses. Press 1 when a face appears and 9 for a house. Press any key to continue',
    showProgressBar: false,
    stimulus1: {
      dir: facesDir,
      title: 'Face',
      type: EVENTS.STIMULUS_1,
      response: '1'
    },
    stimulus2: {
      dir: housesDir,
      title: 'House',
      type: EVENTS.STIMULUS_2,
      response: '9'
    }
  },
  mainTimeline: ['intro', 'faceHouseTimeline', 'end'], // array of trial and timeline ids
  trials: {
    intro: {
      type: 'callback-html-display',
      id: 'intro',
      post_trial_gap: 1000
    },
    end: {
      id: 'end',
      type: 'callback-html-display',
      stimulus: 'Thanks for participating. Press any key to continue',
      response_ends_trial: true,
      post_trial_gap: 500
    }
  },
  timelines: {
    faceHouseTimeline: {
      id: 'faceHouseTimeline',
      timeline: [
        {
          id: 'interTrial',
          type: 'callback-image-display',
          stimulus: fixation,
          response_ends_trial: false
        },
        {
          id: 'trial',
          response_ends_trial: false
        }
      ]
    }
  }
});
