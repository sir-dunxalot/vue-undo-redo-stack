export default {

  data() {
    return {
      undoStackMaxDepth: 10,
      undoStack: [],
      undoStackCurrent: null,
      undoOrRedoInProgress: false,
      redoStack: [],
    };
  },

  computed: {

    canUndo() {
      return !!this.undoStack.length;
    },

    cantUndo() {
      return !this.canUndo;
    },

    canRedo() {
      return !!this.redoStack.length;
    },

    cantRedo() {
      return !this.canRedo;
    },

    checkpointData() {
      throw 'Please implement a `checkpointData` computed property';
    },

    checkpointsToRemoveCount() {
      return this.undoStack.length - this.undoStackMaxDepth;
    },

    hasCheckpointsToRemove() {
      return !!(this.checkpointsToRemoveCount > 0);
    },
  },

  methods: {

    checkpoint() {
      /* Don't create a checkpoint if an undo or redo is in progress since
      those movements shouldn't add to the stack but, in changing the canvas,
      trigger a checkpoint. */

      if (this.undoOrRedoInProgress) {
        return;
      }

      const checkpointData = this.checkpointData;

      if (checkpointData !== this.undoStack[this.undoStack.length - 1]) {
        this.undoStack.push(checkpointData);
        this.redoStack.length = 0; // Clears the array
        this.undoStackCurrent = checkpointData;
      }

      if (this.hasCheckpointsToRemove) {
        this.undoStack.splice(0, this.undoStackCheckpointsToRemoveCount);
      }
    },

    redo() {
      if (this.canRedo && !this.undoOrRedoInProgress) {
        this.undoOrRedoInProgress = true;

        const current = this.undoStackCurrent;
        const last = this.redoStack.pop();

        this.restoreCheckpoint(last);
        this.undoStackCurrent = last;
        this.undoStack.push(current);

        setTimeout(() => {
          this.undoOrRedoInProgress = false;
        }, 200);
      }
    },

    restoreCheckpoint() {
      throw 'Please implement a `restoreCheckpoint` function';
    },

    undo() {
      if (this.canUndo && !this.undoOrRedoInProgress) {
        this.undoOrRedoInProgress = true;

        const current = this.checkpointData;
        const last = this.undoStack.pop();

        if (current !== last) {
          this.undoStackCurrent = last;
          this.restoreCheckpoint(last);
          this.redoStack.push(current);
        } else {
          this.undo();
        }

        setTimeout(() => {
          this.undoOrRedoInProgress = false;
        }, 200);
      }
    },
  },
};
